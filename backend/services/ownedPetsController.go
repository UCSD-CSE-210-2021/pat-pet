package services

import (
	"github.com/cse210/petbackend/dao"
	"github.com/gin-gonic/gin"
	"net/http"
)

func GetUserPets(c *gin.Context) {
	userid := c.Params.ByName("id")
	var pets = dao.QueryOwnedPets(userid)
	c.JSON(http.StatusOK, pets)
}

func DeleteUserPets(c *gin.Context) {
	userid := c.Params.ByName("id")
	petid := c.Params.ByName("pid")
	success := dao.DeleteOwnedPet(userid, petid)
	c.JSON(http.StatusOK, gin.H{"status" : success})
}