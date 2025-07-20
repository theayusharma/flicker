package models
import "time"

type Project struct {
	ID          uint      `gorm:"primaryKey;autoIncrement"`
	Name        string    `gorm:"not null"`
	Description string    `gorm:"type:text"`
	StartDate   *time.Time
	EndDate     *time.Time

	Tasks        []Task        `gorm:"foreignKey:ProjectId"`
	ProjectTeams []ProjectTeam `gorm:"foreignKey:ProjectId"`
}
