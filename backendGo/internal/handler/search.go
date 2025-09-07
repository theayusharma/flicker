package handler

import (
	"backendGo/internal/models"
	"backendGo/pkg/database"

	"github.com/gofiber/fiber/v2"
)

func Search(c *fiber.Ctx) error {

	var query = c.Query("query")

	var task []models.Task
	if err := database.DB.Debug().Where("to_tsvector('english', coalesce(title, '') || ' ' || coalesce(description, '')) @@ plainto_tsquery(?)", query).Find(&task).Error; err != nil {
		// if err := database.DB.Debug().Where("Title ILIKE ? OR Description ILIKE ?", "%"+query+"%", "%"+query+"%").Find(&task).Error; err != nil {

		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	var project []models.Project
	if err := database.DB.Debug().Where("to_tsvector('english', coalesce(name, '') || ' ' || coalesce(description, '')) @@ plainto_tsquery(?)", query).Find(&project).Error; err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	var user []models.User

	if err := database.DB.Debug().Where("to_tsvector('english', coalesce(username, '')) @@ plainto_tsquery(?)", query).Find(&user).Error; err != nil {

		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": err.Error(),
		})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"task":    task,
		"project": project,
		"user":    user,
	})
}
