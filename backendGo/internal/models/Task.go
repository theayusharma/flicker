package models

import (
	"time"
	"gorm.io/gorm"
)

type Team struct {
	ID                   uint           `gorm:"primaryKey;autoIncrement"`
	CreatedAt            time.Time
	UpdatedAt            time.Time
	DeletedAt            gorm.DeletedAt `gorm:"index"`
	TeamName             string         `gorm:"not null"`
	ProductOwnerUserID   *uint          `gorm:"index"`
	ProjectManagerUserID *uint          `gorm:"index"`

	Users        []User        `gorm:"foreignKey:TeamID"`
	ProjectTeams []ProjectTeam `gorm:"foreignKey:TeamID"`
}

type User struct {
	UserID            uint           `gorm:"primaryKey;autoIncrement"`
	CreatedAt         time.Time
	UpdatedAt         time.Time
	DeletedAt         gorm.DeletedAt `gorm:"index"`
	CognitoID         string         `gorm:"unique;not null"`
	Username          string         `gorm:"unique;not null"`
	ProfilePictureURL *string        `gorm:"type:text"`
	TeamID            *uint          `gorm:"index"`

	Team            *Team           `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;foreignKey:TeamID"`
	AuthoredTasks   []Task          `gorm:"foreignKey:AuthorID"`
	AssignedTasks   []Task          `gorm:"foreignKey:AssigneeID"`
	TaskAssignments []TaskAssignment `gorm:"foreignKey:UserID"`
	Attachments     []Attachment    `gorm:"foreignKey:UploadedByID"`
	Comments        []Comment       `gorm:"foreignKey:UserID"`
}

type Project struct {
	ID          uint           `gorm:"primaryKey;autoIncrement"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
	DeletedAt   gorm.DeletedAt `gorm:"index"`
	Name        string         `gorm:"not null"`
	Description *string        `gorm:"type:text"`
	StartDate   *time.Time
	EndDate     *time.Time

	Tasks        []Task        `gorm:"foreignKey:ProjectID"`
	ProjectTeams []ProjectTeam `gorm:"foreignKey:ProjectID"`
}

type ProjectTeam struct {
	ID        uint           `gorm:"primaryKey;autoIncrement"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
	TeamID    uint           `gorm:"not null;index"`
	ProjectID uint           `gorm:"not null;index"`

	Team    Team    `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:TeamID"`
	Project Project `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:ProjectID"`
}

type Task struct {
	ID          uint           `gorm:"primaryKey;autoIncrement"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
	DeletedAt   gorm.DeletedAt `gorm:"index"`
	Title       string         `gorm:"not null"`
	Description *string        `gorm:"type:text"`
	Status      *string        `gorm:"type:varchar(50)"`
	Priority    *string        `gorm:"type:varchar(50)"`
	Tags        *string        `gorm:"type:text"`
	StartDate   *time.Time
	DueDate     *time.Time
	Points      *uint
	ProjectID   uint           `gorm:"not null;index"`
	AuthorID    uint           `gorm:"not null;index"`
	AssigneeID  *uint          `gorm:"index"`

	Project         Project         `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:ProjectID"`
	Author          User            `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;foreignKey:AuthorID"`
	Assignee        *User           `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;foreignKey:AssigneeID"`
	TaskAssignments []TaskAssignment `gorm:"foreignKey:TaskID"`
	Attachments     []Attachment    `gorm:"foreignKey:TaskID"`
	Comments        []Comment       `gorm:"foreignKey:TaskID"`
}

type TaskAssignment struct {
	ID        uint           `gorm:"primaryKey;autoIncrement"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
	UserID    uint           `gorm:"not null;index"`
	TaskID    uint           `gorm:"not null;index"`

	User User `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:UserID"`
	Task Task `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:TaskID"`
}

type Attachment struct {
	ID           uint           `gorm:"primaryKey;autoIncrement"`
	CreatedAt    time.Time
	UpdatedAt    time.Time
	DeletedAt    gorm.DeletedAt `gorm:"index"`
	FileURL      string         `gorm:"not null;type:text"`
	FileName     *string        `gorm:"type:text"`
	TaskID       uint           `gorm:"not null;index"`
	UploadedByID uint           `gorm:"not null;index"`

	Task       Task `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:TaskID"`
	UploadedBy User `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;foreignKey:UploadedByID"`
}

type Comment struct {
	ID        uint           `gorm:"primaryKey;autoIncrement"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
	Text      string         `gorm:"not null;type:text"`
	TaskID    uint           `gorm:"not null;index"`
	UserID    uint           `gorm:"not null;index"`

	Task Task `gorm:"constraint:OnUpdate:CASCADE,OnDelete:CASCADE;foreignKey:TaskID"`
	User User `gorm:"constraint:OnUpdate:CASCADE,OnDelete:SET NULL;foreignKey:UserID"`
}
