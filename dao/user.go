package dao

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

func userTableName() string {
	return dbManager.getTableName("USER_TABLE_NAME")
}
func GetAllUsers(c *gin.Context) {
	var users = dbManager.scanTable(userTableName())
	for _, user := range users {
		fmt.Println("id", user["id"], "name", user["name"])
	}
	c.JSON(http.StatusOK, users)
}