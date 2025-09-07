package routes

import (
	"backendGo/internal/handler"

	"github.com/gofiber/fiber/v2"
)

func Teams(app *fiber.App) {
	route := app.Group("/teams")

	route.Get("/", handler.Teams)
}
