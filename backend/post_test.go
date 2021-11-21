package main

import (
	"github.com/cse210/petbackend/dao"

	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/stretchr/testify/assert"
)

// Insert new pet posts
// New inserted pet will be removed after test
func TestInsertNewPet(t *testing.T) {
	assert := assert.New(t)

	router := setupRouter()

	w := httptest.NewRecorder()
	requestBody, _ := json.Marshal(map[string]string{
		"name":        "Nym",
		"category":    "test",
		"description": "Nym is a cockatiel, which is a terrific companion with lots of personality. Nym is extremely social, and thrive on interaction",
		"image_url":   "https://images.app.goo.gl/ctoaqRXgBgtvPhh28",
		"owner_id":    "s9sdf23-lk24-sdf23-cvlkdfs-23jlkmds209j",
	})
	req, _ := http.NewRequest("POST", "/pets/new", bytes.NewReader(requestBody))
	router.ServeHTTP(w, req)

	resp := w.Result()
	_, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		t.Fatalf("Unable to read response body")
	}

	results := dao.QueryPetsWithKeyWords("test")
	id := fmt.Sprintf("%v", results[0]["id"])
	dao.DeleteOwnedPet("s9sdf23-lk24-sdf23-cvlkdfs-23jlkmds209j", id)

	assert.Equal(resp.StatusCode, http.StatusOK, "Should have StatusOK")
}
