package handler

import (
	"backendGo/internal/models"
	"backendGo/internal/models/dto"
	"backendGo/pkg/database"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

func GetTasks(c *fiber.Ctx) error {
	var project_id = c.Query("projectId")
	if project_id == "" {
		return c.Status(400).JSON(fiber.Map{"message": "send a valid projectid broo"})
	}
	projectId, err := strconv.Atoi(project_id)
	// taskId, err := strconv.Atoi(task_id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"message": "invalid projectidddd"})
	}

	var tasks []models.Task
	if err := database.DB.Debug().Preload("Attachments").
		Preload("Author").
		Preload("Assignee").Where("project_id = ?", projectId).Find(&tasks).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"messsage": "error in giving tasks" + err.Error()})
	}
	return c.JSON(tasks)
}

func CreateTask(c *fiber.Ctx) error {

	var input dto.Task

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

	task := models.Task{

		ID:          input.ID,
		CreatedAt:   input.CreatedAt,
		UpdatedAt:   input.UpdatedAt,
		Title:       input.Title,
		Description: input.Description,
		Status:      input.Status,
		Priority:    input.Priority,
		Tags:        input.Tags,
		StartDate:   input.StartDate,
		DueDate:     input.DueDate,
		Points:      input.Points,
		ProjectID:   input.ProjectID,
		AuthorID:    input.AuthorID,
		AssigneeID:  input.AssigneeID,
	}
	if err := database.DB.Create(&task).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"message": "error creating taskkkkk"})
	}
	return c.Status(201).JSON(task)
}

func UpdateTaskStatus(c *fiber.Ctx) error {

	task_id := c.Params("id")
	id, err := strconv.Atoi(task_id)
	if err != nil {
		return c.Status(400).JSON(fiber.Map{"message": "invalid projectidddd"})
	}

	var body struct {
		Status string `json:"status" validate:"required"`
	}
	if err := c.BodyParser(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "error inavalid reqqq",
			"erorr":   err.Error(),
		})
	}

	validate := validator.New()
	if err := validate.Struct(&body); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"message": "validation failed : /",
			"errors":  err.Error(),
		})
	}

	if err := database.DB.Debug().Model(&models.Task{}).Where("task_id = ?", id).Update("status", body.Status).Error; err != nil {
		return c.Status(500).JSON(fiber.Map{"messsage": "error in giving tasks" + err.Error()})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"messsage": "succ",
		"taskId":   id,
		"status":   body.Status,
	})
}
