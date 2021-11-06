package services

import (
	"github.com/cse210/petbackend/dao"
	"github.com/gin-gonic/gin"
	"net/http"
)

type UserRequest struct {
	Zipcode string `json:"zipcode"`
}

func GetUsers(c *gin.Context) {
	var usrReq UserRequest
	c.BindJSON(&usrReq)
	var users []map[string]interface{}
	if usrReq.Zipcode == "" {
		users = dao.ScanUsers()
	} else {
		users = dao.QueryUsersWithZipcode(usrReq.Zipcode)
	}
	c.JSON(http.StatusOK, users)
}