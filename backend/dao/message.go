package dao

import (
	"fmt"
	uuid "github.com/google/uuid"
)

func messagesTableName() string {
	return dbManager.getTableName("MESSAGES_TABLE_NAME")
}

func InsertNewMessage(senderId string, receiverId string, content string, delivered bool) bool {
	sqlStatement := `INSERT INTO ` + messagesTableName() +
		` (id, sender_id, receiver_id, content, delivered) VALUES ($1, $2, $3, $4, $5)`
	id := uuid.New().String()
	_, err := dbManager.db.Exec(sqlStatement, id, senderId, receiverId, content, delivered)
	if err != nil {
		fmt.Println(err)
		return false
	}
	return true
}

func QueryMessages(senderId string, receiverId string) []map[string]interface{} {
	rows, _ := dbManager.db.Query("SELECT * FROM "+messagesTableName()+" WHERE sender_id = $1 AND receiver_id = $2", senderId, receiverId)
	defer rows.Close()
	return dbManager.rowsToObjects(rows)
}
