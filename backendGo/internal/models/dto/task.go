package dto

import "time"

type Project struct{
	Name string `json:"name"`
	Description *string `json:"description"`
	StartDate *time.Time `json:"startDate"`
	EndDate *time.Time `json:"endDate"`
}
