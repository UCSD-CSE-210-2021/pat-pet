package services

import (
	"github.com/cse210/petbackend/dao"
	"github.com/gin-gonic/gin"
	"net/http"
)

type UserCommand struct {
	Zipcode string `json:"zipcode" binding:"required"`
}

func GetUsers(c *gin.Context) {
	var usrCmd UserCommand
	c.BindJSON(&usrCmd)
	var users = dao.QueryUsersWithZipcode(usrCmd.Zipcode)
	c.JSON(http.StatusOK, users)
}