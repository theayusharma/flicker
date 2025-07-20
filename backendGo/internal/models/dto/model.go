package dto

import "time"

type Task struct{

	ID          uint           `json:"ID"`
	CreatedAt   time.Time
	UpdatedAt   time.Time
	Title       string         `json:"Title"`
	Description *string        `json:"Description"`
	Status      *string        `json:"Status"`
	Priority    *string        `json:"Priority"`
	Tags        *string        `json:"Tags"`
	StartDate *time.Time `json:"startDate"`
	DueDate     *time.Time `json:"dueDate"`
	Points      *uint   `json:"Points"`
	ProjectID   uint           `json:"ProjectID"`
	AuthorID    uint           `json:"AuthorID"`
	AssigneeID  *uint          `json:"AssigneeID"`
}
