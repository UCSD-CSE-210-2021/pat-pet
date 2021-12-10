package services

import (
	"net/http"

	"github.com/cse210/petbackend/dao"
	"github.com/gin-gonic/gin"
)

func GetFollowedPets(c *gin.Context) {
	userid := c.Params.ByName("id")
	var pets = dao.QueryFollowPets(userid)
	c.JSON(http.StatusOK, pets)
}

func FollowPets(c *gin.Context) {
	userid := c.Params.ByName("id")
	petid := c.Params.ByName("pid")
	success := dao.FollowPets(userid, petid)
	c.JSON(http.StatusOK, gin.H{"status": success})
}

func UnfollowPets(c *gin.Context) {
	userid := c.Params.ByName("id")
	petid := c.Params.ByName("pid")
	success := dao.UnfollowPets(userid, petid)
	c.JSON(http.StatusOK, gin.H{"status": success})
}
