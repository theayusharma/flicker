package handler

import (
	"backendGo/internal/models"
	"backendGo/internal/models/dto"
	"backendGo/pkg/database"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

func GetProject(c *fiber.Ctx) error {

	var project []models.Project
	// var id = c.Query("projectId")
	// if id == "" {
	// 	return c.Status(400).JSON(fiber.Map{"message":"send a valid projectid broo"})
	// }
	// if err := database.DB.Where("project_id = ?", id).First(&project).Error; err != nil {
	// 	return c.Status(500).JSON(fiber.Map{"message": "error retrieving projectssssss"})
	// }
	if err := database.DB.Find(&project).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	}
	//agr aa gya toh
	return c.JSON(project)
}

func CreateProject(c *fiber.Ctx) error {

	var input dto.Project

	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error inavalid reqqq",
			"erorr":   err.Error(),
		})
	}
	validate := validator.New()
	if err := validate.Struct(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "validation failed : /",
			"errors":  err.Error(),
		})
	}

	project := models.Project{
		Name:        input.Name,
		Description: input.Description,
		StartDate:   input.StartDate,
		EndDate:     input.EndDate,
	}
	if err := database.DB.Create(&project).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"message": "error creating pporjectst"})
	}
	return c.Status(201).JSON(project)
}
