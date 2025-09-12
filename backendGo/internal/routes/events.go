package routes

import (
	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"

	"backendGo/internal/handler"
)

func SetupEventRoutes(app *fiber.App, db *gorm.DB) {
	eventHandler := handler.NewEventHandler(db)

	events := app.Group("/api/events")

	events.Get("/", eventHandler.GetAllEvents)
	events.Post("/", eventHandler.CreateEvent)
	events.Get("/:id", eventHandler.GetEventByID)
	events.Put("/:id", eventHandler.UpdateEvent)
	events.Delete("/:id", eventHandler.DeleteEvent)
}
