package services

import (
	"github.com/cse210/petbackend/dao"
	"github.com/gin-gonic/gin"
	"net/http"
)

func GetMessageHistory(c *gin.Context) {
	userOneId := c.Query("user_one_id")
	userTwoId := c.Query("user_two_id")
	var messages = dao.QueryMessages(userOneId, userTwoId)
	c.JSON(http.StatusOK, messages)
}
