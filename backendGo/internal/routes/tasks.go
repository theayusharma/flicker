package routes

import (
	"github.com/gofiber/fiber/v2"
	"backendGo/internal/handler"
)



func TaskRoutes(app * fiber.App) {

	task := app.Group("/tasks")
	task.Get("/",handler.GetTasks)
	task.Post("/", handler.CreateTask)
}
