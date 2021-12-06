package services

import (
	"github.com/cse210/petbackend/dao"
	"github.com/gin-gonic/gin"
	"net/http"
)

func GetMessages(c *gin.Context) {
	senderId := c.Params.ByName("senderid")
	receiverId := c.Params.ByName("receiverid")
	var messages = dao.QueryMessages(senderId, receiverId)
	c.JSON(http.StatusOK, messages)
}
