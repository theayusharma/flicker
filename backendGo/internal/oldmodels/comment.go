package models



type Comment struct {
	ID     uint   `gorm:"primaryKey;autoIncrement"`
	Text   string `gorm:"not null"`
	TaskID uint
	UserID uint

	Task Task `gorm:"foreignKey:TaskID;references:ID"`
	User User `gorm:"foreignKey:UserID;references:UserID"`
}

