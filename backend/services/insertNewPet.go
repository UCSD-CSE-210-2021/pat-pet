package services

import (
	"github.com/cse210/petbackend/dao"
	"github.com/gin-gonic/gin"
	"net/http"
)

type NewPetRequest struct {
	Name string `json:"name" binding:"required"`
	Category string `json:"category" binding:"required"`
	Description string `json:"description" binding:"required"`
	ImageURL string `json:"image_url"`
	OwnerId string `json:"owner_id" binding:"required"`
}

func PostNewPet(c *gin.Context) {
	var npReq NewPetRequest
	c.BindJSON(&npReq)
	res := dao.InsertNewPet(npReq.Name, npReq.Category, npReq.Description, npReq.ImageURL, npReq.OwnerId)
	if res == false {
		c.JSON(http.StatusInternalServerError, "Server Error")
		return
	}
	c.JSON(http.StatusOK, "Success")
}
