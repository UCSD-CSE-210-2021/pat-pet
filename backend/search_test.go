package main

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"
)

// Search pet posts with empty keyword
// Expect to get all 4 pet posts in the test db
func TestSearchEmptyKeyword(t *testing.T) {
	router := setupRouter()

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/pets/search", nil)
	router.ServeHTTP(w, req)

	resp := w.Result()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Fatalf("Unable to read response body")
	}

	m := make([]map[string]interface{}, 0)
	err = json.Unmarshal(body, &m)
	if err != nil {
		t.Fatalf("Unable to unmarshal response body to a map")
	} else if len(m) != 4 {
		t.Fatalf("Total number of pet posts - Got: %d; Expected: %d", len(m), 4)
	}
}

// Search pet posts with keyword cat
// Expect to get 2 cat posts in the test db
func TestSearchCatKeyword(t *testing.T) {
	router := setupRouter()

	w := httptest.NewRecorder()
	requestBody, _ := json.Marshal(map[string]string{
		"keyword": "cat",
	})
	req, _ := http.NewRequest("POST", "/pets/search", bytes.NewReader(requestBody))
	router.ServeHTTP(w, req)

	resp := w.Result()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Fatalf("Unable to read response body")
	}

	m := make([]map[string]interface{}, 0)
	err = json.Unmarshal(body, &m)
	if err != nil {
		t.Fatalf("Unable to unmarshal response body to a map")
	} else if len(m) != 2 {
		t.Fatalf("Total number of cat posts - Got: %d; Expected: %d", len(m), 2)
	}
}

// Search pet posts with keyword dog
// Expect to get 0 dog posts in the test db
func TestSearchDogKeyword(t *testing.T) {
	router := setupRouter()

	w := httptest.NewRecorder()
	requestBody, _ := json.Marshal(map[string]string{
		"keyword": "dog",
	})
	req, _ := http.NewRequest("POST", "/pets/search", bytes.NewReader(requestBody))
	router.ServeHTTP(w, req)

	resp := w.Result()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Fatalf("Unable to read response body")
	}

	m := make([]map[string]interface{}, 0)
	err = json.Unmarshal(body, &m)
	if err != nil {
		t.Fatalf("Unable to unmarshal response body to a map")
	} else if len(m) != 0 {
		t.Fatalf("Total number of dog posts - Got: %d; Expected: %d", len(m), 0)
	}
}
