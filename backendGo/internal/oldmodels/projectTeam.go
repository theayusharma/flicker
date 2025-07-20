package models


type ProjectTeam struct {
	ID        uint `gorm:"primaryKey;autoIncrement"`
	TeamID    uint
	ProjectID uint

	Team    Team    `gorm:"foreignKey:TeamID;references:ID"`
	Project Project `gorm:"foreignKey:ProjectID;references:ID"`
}

