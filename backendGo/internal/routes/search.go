package routes

import (
	"backendGo/internal/handler"

	"github.com/gofiber/fiber/v2"
)

func SearchRoutes(c *fiber.App) {
	app := c.Group("/search")

	app.Get("/", handler.Search)
}
