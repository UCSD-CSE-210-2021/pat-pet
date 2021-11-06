package services

import (
	"github.com/cse210/petbackend/dao"
	"github.com/gin-gonic/gin"
	"net/http"
)

type KeywordRequest struct {
	Keyword string `json:"keyword" binding:"required"`
}

func GetPetsWithKeyWords(c *gin.Context) {
	var kwCmd KeywordRequest
	c.BindJSON(&kwCmd)
	var pets = dao.QueryPetsWithKeyWords(kwCmd.Keyword)
	c.JSON(http.StatusOK, pets)
}
