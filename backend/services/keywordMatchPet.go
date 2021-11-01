package services

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"github.com/cse210/petbackend/dao"
)

type KeywordCommand struct {
	Keyword string `json:"keyword" binding:"required"`
}

func GetPetsWithKeyWords(c *gin.Context) {
	var kwCmd KeywordCommand
	c.BindJSON(&kwCmd)
	var pets = dao.QueryPetsWithKeyWords(kwCmd.Keyword)
	c.JSON(http.StatusOK, pets)
}
