package routes

import (
	"backendGo/internal/handler"
	"backendGo/middleware"
	"backendGo/pkg/database"

	"github.com/gofiber/fiber/v2"
)

func Teams(app *fiber.App) {
	authMiddleware := middleware.NewAuthMiddleware(database.GetDB())

	route := app.Group("/teams")
	route.Use(authMiddleware.RequireAuth)

	route.Get("/", handler.Teams)
}
