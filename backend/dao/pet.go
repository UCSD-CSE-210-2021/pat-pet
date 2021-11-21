package dao

import (
	"database/sql"
	"fmt"
	uuid "github.com/google/uuid"
)

func petsTableName() string {
	return dbManager.getTableName("PETS_TABLE_NAME")
}

func QueryPetsWithKeyWords(keyword string) []map[string]interface{} {
	usermapStmt := "(SELECT name AS user_name, id AS user_id, contact FROM " + userTableName() + ") AS user_accessory"
	userIdJoinKey := "user_accessory.user_id"
	petIdJoinKey := petsTableName() + ".owner_id"
	joinStmt := " ON " + userIdJoinKey + " = " + petIdJoinKey
	var rows *sql.Rows
	if keyword != "" {
		rows, _ = dbManager.db.Query(
			"SELECT * FROM " +
				petsTableName() +
				" INNER JOIN " + usermapStmt + joinStmt +
				" WHERE LOWER(description) ILIKE $1 OR LOWER(category) ILIKE $1",
			"%"+keyword+"%")
	} else {
		rows, _ = dbManager.db.Query(
			"SELECT * FROM " +
				petsTableName() +
				" INNER JOIN " + usermapStmt + joinStmt,
			)
	}
	defer rows.Close()
	var results = dbManager.rowsToObjects(rows)
	return results
}

func QueryOwnedPets(userid string) []map[string]interface{} {
	return dbManager.queryField(petsTableName(), "owner_id", userid)
}

func DeleteOwnedPet(userid string, petid string) bool {
	_, err := dbManager.db.Exec(
		"DELETE FROM " + petsTableName() + " WHERE owner_id = $1 AND id = $2",
		userid,
		petid)
	if err != nil {
		return false
	}
	return true
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