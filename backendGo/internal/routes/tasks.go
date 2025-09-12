package routes

import (
	"backendGo/internal/handler"
	"backendGo/middleware"
	"backendGo/pkg/database"

	"github.com/gofiber/fiber/v2"
)

func TaskRoutes(app *fiber.App) {
	authMiddleware := middleware.NewAuthMiddleware(database.GetDB())

	task := app.Group("/tasks")
	task.Use(authMiddleware.RequireAuth)

	task.Get("/", handler.GetTasks)
	task.Post("/", handler.CreateTask)
	task.Patch("/:id/status", handler.UpdateTaskStatus)
}
