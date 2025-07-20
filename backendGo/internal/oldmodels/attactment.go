
package models


type Attachment struct {
	ID           uint   `gorm:"primaryKey;autoIncrement"`
	FileURL      string `gorm:"not null"`
	FileName     string
	TaskId       uint `gorm:"not null"`
	UploadedById uint `gorm:"not null"`

	Task       Task `gorm:"foreignKey:TaskId"`
	UploadedBy User `gorm:"foreignKey:UploadedById"`
}
