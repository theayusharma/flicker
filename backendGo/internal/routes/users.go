package routes

import (
	"backendGo/internal/handler"

	"github.com/gofiber/fiber/v2"
)

func Users(app *fiber.App) {

	user := app.Group("/user")

	user.Get("/", handler.GetUsers)

}
