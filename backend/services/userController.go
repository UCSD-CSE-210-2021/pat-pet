package services

import (
	"github.com/cse210/petbackend/dao"
	"github.com/gin-gonic/gin"
	"net/http"
)

type UserRequest struct {
	Zipcode string `json:"zipcode"`
}

type UserInfoRequest struct {
	Id string `json:"id"`
	Contact string `json:"contact"`
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

func UpdateUserInfo(c *gin.Context) {
	var usrInfoReq UserInfoRequest
	c.BindJSON(&usrInfoReq)
	success := dao.UpdateUser(usrInfoReq.Id, usrInfoReq.Contact, usrInfoReq.Zipcode)
	c.JSON(http.StatusOK, gin.H{"status" : success})
}