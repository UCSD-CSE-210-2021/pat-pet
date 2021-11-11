package dao

import (
	"fmt"
	uuid "github.com/google/uuid"
)

func petsTableName() string {
	return dbManager.getTableName("PETS_TABLE_NAME")
}

func QueryPetsWithKeyWords(keyword string) []map[string]interface{} {
	rows, err := dbManager.db.Query(
		"SELECT * FROM " +
			petsTableName() +
			" WHERE LOWER(description) ILIKE $1 OR LOWER(category) ILIKE $1",
		"%"+keyword+"%")
	if err != nil {
		panic(err)
	}
	defer rows.Close()
	var results = dbManager.rowsToObjects(rows)
	return results
}

func InsertNewPet(name string, category string, description string, imageUrl string, ownerId string) bool {
	sqlStatement := `INSERT INTO ` +  petsTableName() +
		` (id, name, category, description, image_url, owner_id) VALUES ($1, $2, $3, $4, $5, $6)`
	id := uuid.New().String()
	_, err := dbManager.db.Exec(sqlStatement, id, name, category, description, imageUrl, ownerId)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}