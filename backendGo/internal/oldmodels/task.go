package models
import "time"
type Task struct {
	ID             uint       `gorm:"primaryKey;autoIncrement"`
	Title          string     `gorm:"not null"`
	Description    *string
	Status         *string
	Priority       *string
	Tags           *string
	StartDate      *time.Time
	DueDate        *time.Time
	Points         *int
	ProjectID      uint
	AuthorUserID   uint
	AssignedUserID *uint

	Project         Project        `gorm:"foreignKey:ProjectID;references:ID"`
	Author          User           `gorm:"foreignKey:AuthorUserID;references:UserID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
	Assignee        *User          `gorm:"foreignKey:AssignedUserID;references:UserID;constraint:OnUpdate:CASCADE,OnDelete:SET NULL"`
	TaskAssignments []TaskAssignment
	Attachments     []Attachment
	Comments        []Comment
}
