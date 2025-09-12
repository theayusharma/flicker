package models

import (
	"time"

	"gorm.io/gorm"
)

type Organiser struct {
	ID        uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
	Name      string         `gorm:"not null" json:"name"`
	Email     string         `gorm:"unique;not null" json:"email"`
	Password  string         `gorm:"not null" json:"-"`
	Address   string         `json:"address"`
	Mobile    string         `json:"mobile"`
	GoogleID  string         `gorm:"unique" json:"google_id,omitempty"`
	Image     string         `json:"image,omitempty"`

	Events []Event `gorm:"foreignKey:OrganiserID" json:"events,omitempty"`
}

type Event struct {
	ID          uint           `gorm:"primaryKey;autoIncrement" json:"id"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
	Title       string         `gorm:"not null" json:"title"`
	Description string         `json:"description"`
	EventDate   time.Time      `gorm:"not null" json:"event_date"`
	Address     string         `gorm:"not null" json:"address"`
	City        string         `gorm:"not null" json:"city"`
	OrganiserID uint           `gorm:"not null" json:"organiser_id"`

	Organiser Organiser `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE" json:"organiser,omitempty"`
}
