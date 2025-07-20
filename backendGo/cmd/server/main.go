package main

import(
	"log"
	"github.com/gofiber/fiber/v2"
	"backendGo/pkg/database"
	"backendGo/internal/routes"
)

func main() {
	app := fiber.New()

	app.Get("/", func(c * fiber.Ctx) error{
		return c.SendString("hello go cat")
	})
	routes.TaskRoutes(app)
	routes.ProjectRoutes(app)
	database.InitDB()
	log.Fatal(app.Listen(":3001"))
}
