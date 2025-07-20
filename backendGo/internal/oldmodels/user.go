package models

type User struct {
	UserID            uint           `gorm:"primaryKey;autoIncrement"`
	CognitoID         string         `gorm:"unique;not null"`
	Username          string         `gorm:"unique;not null"`
	ProfilePictureURL *string
	TeamID            *uint

	AuthoredTasks     []Task         `gorm:"foreignKey:AuthorUserID"`
	AssignedTasks     []Task         `gorm:"foreignKey:AssignedUserID"`
	TaskAssignments   []TaskAssignment
	Attachments       []Attachment   `gorm:"foreignKey:UploadedByID"`
	Comments          []Comment
	Team              *Team          `gorm:"foreignKey:TeamID"`
}

