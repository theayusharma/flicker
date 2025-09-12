package routes

import (
	"backendGo/internal/handler"
	"backendGo/middleware"
	"backendGo/pkg/database"

	"github.com/gofiber/fiber/v2"
)

func SearchRoutes(c *fiber.App) {
	authMiddleware := middleware.NewAuthMiddleware(database.GetDB())

	app := c.Group("/search")
	app.Use(authMiddleware.RequireAuth)

	app.Get("/", handler.Search)
}
