package handler

import (
	"backendGo/internal/models"
	"backendGo/pkg/database"

	"github.com/gofiber/fiber/v2"
)

func Search(c *fiber.Ctx) error {

	var query = c.Query("query")

	var task []models.Task
	if err := database.DB.Debug().Where("title ILIKE ? OR description ILIKE", "%"+query+"%", "%"+query+"%").Find(&task); err != nil {

		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err,
		})
	}
	var project []models.Project
	if err := database.DB.Debug().Where("title ILIKE ? OR description ILIKE", "%"+query+"%", "%"+query+"%").Find(&project); err != nil {

		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err,
		})
	}

	var user []models.User
	if err := database.DB.Debug().Where("title ILIKE ? OR description ILIKE", "%"+query+"%", "%"+query+"%").Find(&user); err != nil {

		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err,
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"task":    task,
		"project": project,
		"user":    user,
	})
}
