package routes

import (
	"backendGo/internal/handler"
	"github.com/gofiber/fiber/v2"
)


func ProjectRoutes(app *fiber.App){
	project := app.Group("/projects")
	
	project.Get("/", handler.GetProject)
	project.Post("/", handler.CreateProject)
}
