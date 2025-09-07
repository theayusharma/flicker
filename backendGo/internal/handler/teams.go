package handler

import (
	// "backendGo/internal/models"
	"backendGo/pkg/database"
	"github.com/gofiber/fiber/v2"
	"time"
)

type TeamResponse struct {
	ID                     uint      `json:"id"`
	TeamName               string    `json:"team_name"`
	CreatedAt              time.Time `json:"created_at"`
	UpdatedAt              time.Time `json:"updated_at"`
	ProductOwnerUsername   *string   `json:"product_owner_username"`
	ProjectManagerUsername *string   `json:"project_manager_username"`
}

func Teams(c *fiber.Ctx) error {

	// return c.Status(200).JSON(fiber.Map{"ise": "ise"})

	var model []TeamResponse

	// id := c.Query("query")
	//
	// if id == "" {
	// 	return c.Status(400).JSON(fiber.Map{
	// 		"userId": "is empty",
	// 	})
	// }
	//
	// var result []models.ProjectTeam

	// if err := database.DB.Debug().Select("Username").Where("product_owner_user_id = ?", id).Find(&model).Error; err != nil {
	//

	err := database.DB.Table("teams t").
		Select(`t.id, t.team_name, t.created_at, t.updated_at,
            po.username AS product_owner_username,
            pm.username AS project_manager_username`).
		Joins("LEFT JOIN users po ON po.user_id = t.product_owner_user_id").
		Joins("LEFT JOIN users pm ON pm.user_id = t.project_manager_user_id").
		Scan(&model).Error

	if err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "error occurred while fetching from db",
			"error":   err.Error(),
		})
	}
	return c.JSON(model)

}
