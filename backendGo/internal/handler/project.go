package handler

import (
	"backendGo/internal/models"
	"backendGo/internal/models/dto"
	"backendGo/pkg/database"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

func GetProject(c *fiber.Ctx) error {
	userID := c.Locals("userID").(uint)
	var projects []models.Project
	if err := database.DB.Debug().
		Joins("JOIN project_teams ON projects.project_id = project_teams.project_id").
		Joins("JOIN teams ON project_teams.team_id = teams.team_id").
		Joins("JOIN users ON teams.team_id = users.team_id").
		Where("users.user_id = ?", userID).
		Find(&projects).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"error": "Error retrieving projects: " + err.Error()})
	}
	return c.JSON(projects)

	// var project []models.Project
	// var id = c.Query("projectId")
	// if id == "" {
	// 	return c.Status(400).JSON(fiber.Map{"message":"send a valid projectid broo"})
	// }
	// if err := database.DB.Where("project_id = ?", id).First(&project).Error; err != nil {
	// 	return c.Status(500).JSON(fiber.Map{"message": "error retrieving projectssssss"})
	// }
	// if err := database.DB.Find(&project).Error; err != nil {
	// 	return c.Status(500).JSON(fiber.Map{"error": err.Error()})
	// }
	// agr aa gya toh
	// return c.JSON(project)
}

func CreateProject(c *fiber.Ctx) error {
	user := c.Locals("user").(models.User)

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

	if user.TeamID != nil {
		projectTeam := models.ProjectTeam{
			ProjectID: project.ID,
			TeamID:    *user.TeamID,
		}
		if err := database.DB.Create(&projectTeam).Error; err != nil {
			return c.Status(500).JSON(fiber.Map{"message": "Error associating project with team"})
		}
	}

	return c.Status(201).JSON(project)
}
