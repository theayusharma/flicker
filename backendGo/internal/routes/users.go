package routes

import (
	"backendGo/internal/handler"
	"backendGo/middleware"
	"backendGo/pkg/database"

	"github.com/gofiber/fiber/v2"
)

func Users(app *fiber.App) {
	authMiddleware := middleware.NewAuthMiddleware(database.GetDB())

	user := app.Group("/user")
	user.Use(authMiddleware.RequireAuth)

	user.Get("/", handler.GetUsers)

}
