package handler

import (
	"fmt"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"

	"backendGo/internal/models"
)

type AuthHandler struct {
	DB *gorm.DB
}

type GoogleAuthRequest struct {
	Email    string `json:"email"`
	Name     string `json:"name"`
	GoogleID string `json:"googleId"`
	Image    string `json:"image"`
}

type AuthResponse struct {
	ID       uint   `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Role     string `json:"role"`
	Token    string `json:"token,omitempty"`
}

func NewAuthHandler(db *gorm.DB) *AuthHandler {
	return &AuthHandler{DB: db}
}

func (h *AuthHandler) GoogleAuth(c *fiber.Ctx) error {
	var req GoogleAuthRequest
	if err := c.BodyParser(&req); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request body",
		})
	}

	var user models.User

	err := h.DB.Where("email = ? OR (provider = ? AND provider_id = ?)", req.Email, "google", req.GoogleID).First(&user).Error

	if err == gorm.ErrRecordNotFound {
		user = models.User{
			Provider:          "google",
			ProviderID:        req.GoogleID,
			Email:             &req.Email,
			Username:          req.Name,
			ProfilePictureURL: &req.Image,
		}

		if err := h.DB.Create(&user).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Failed to create user",
			})
		}
	} else if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Database error",
		})
	} else {
		user.ProviderID = req.GoogleID
		user.ProfilePictureURL = &req.Image
		h.DB.Save(&user)
	}

	response := AuthResponse{
		ID:       user.UserID,
		Username: user.Username,
		Email:    *user.Email,
		Role:     "user",
		Token:    fmt.Sprintf("%d", user.UserID), // Simple token using user ID
	}

	return c.Status(fiber.StatusOK).JSON(response)
}
