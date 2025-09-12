package routes

import (
	"backendGo/internal/handler"
	"backendGo/middleware"
	"backendGo/pkg/database"

	"github.com/gofiber/fiber/v2"
)

func ProjectRoutes(app *fiber.App) {
	authMiddleware := middleware.NewAuthMiddleware(database.GetDB())

	project := app.Group("/projects")
	project.Use(authMiddleware.RequireAuth)

	project.Get("/", handler.GetProject)
	project.Post("/", handler.CreateProject)
}
