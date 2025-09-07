package handler

import (
	"backendGo/internal/models"
	"backendGo/pkg/database"
	// "strconv"

	"github.com/gofiber/fiber/v2"
)

func GetUsers(c *fiber.Ctx) error {
	// var id = c.Query("query")
	// if id == "" {
	// 	return c.Status(400).JSON(fiber.Map{"message": "send a valid userid broo"})
	// }
	// user_id, err := strconv.Atoi(id)
	// // taskId, err := strconv.Atoi(task_id)
	// if err != nil {
	// 	return c.Status(400).JSON(fiber.Map{"message": "invalid projectidddd"})
	// }
	//
	var users []models.User
	if err := database.DB.Debug().Find(&users).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"messsage": "error in giving users" + err.Error()})
	}
	return c.JSON(users)
}
