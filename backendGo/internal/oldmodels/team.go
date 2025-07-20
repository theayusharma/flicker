package models



type Team struct {
	ID                   uint           `gorm:"primaryKey;autoIncrement"`
	TeamName             string         `gorm:"not null"`
	ProductOwnerUserID   *uint
	ProjectManagerUserID *uint

	ProjectTeams         []ProjectTeam
	Users                []User         `gorm:"foreignKey:TeamID"`
}

