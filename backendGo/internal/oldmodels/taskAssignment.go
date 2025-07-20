package models



type TaskAssignment struct {
	ID     uint `gorm:"primaryKey;autoIncrement"`
	UserID uint
	TaskID uint

	User User `gorm:"foreignKey:UserID;references:UserID"`
	Task Task `gorm:"foreignKey:TaskID;references:ID"`
}


