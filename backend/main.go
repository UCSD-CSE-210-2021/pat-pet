package main

import (
	"net/http"

	"github.com/cse210/petbackend/dao"
	"github.com/cse210/petbackend/services"
	"github.com/gin-gonic/gin"
)

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}

func setupRouter() *gin.Engine {
	// Disable Console Color
	// gin.DisableConsoleColor()
	dao.InitializeDB()
	r := gin.New()
	r.Use(CORSMiddleware())
	// Get user value
	r.POST("/pets/search", services.GetPetsWithKeyWords)
	r.POST("/pets/new", services.PostNewPet)
	r.POST("/users", services.GetUsers)
	r.POST("/user/update", services.UpdateUserInfo)
	// Get user value
	resources := r.Group("/user/:id")
	{
		resources.GET("pets", services.GetUserPets)
		resources.GET("pet/:pid/delete", services.DeleteUserPets)
		resources.GET("follow", services.GetFollowedPets)
		resources.GET("pet/:pid/follow", services.FollowPets)
		resources.GET("pet/:pid/unfollow", services.UnfollowPets)
		resources.GET("test", func(c *gin.Context) {
			user := c.Params.ByName("name")
			c.JSON(http.StatusOK, gin.H{"user": user, "value": "ok"})
		})
	}

	return r
}

func main() {
	r := setupRouter()
	// Listen and Server in 0.0.0.0:8080
	r.Run(":8080")
}
