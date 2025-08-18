package database

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"

	"backendGo/internal/models"
)

var DB *gorm.DB

func InitDB() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("error loading .env file")
	}

	postgresURI := os.Getenv("POSTGRES_URI")
	if postgresURI == "" {
		log.Fatal("POSTGRES_URI is empty in .env")
	}

	DB, err = gorm.Open(postgres.Open(postgresURI), &gorm.Config{
DisableForeignKeyConstraintWhenMigrating: true,
	})
	if err != nil {
		log.Fatalf("failed to connect to DB: %v", err)
	}

	DB.Exec("SET CONSTRAINTS ALL DEFERRED")
	// Correct migration order  : {{}}}}}
 	err = DB.AutoMigrate(
		&models.Team{},
		&models.User{},
		&models.Project{},
		&models.ProjectTeam{},
		&models.Task{},
		&models.TaskAssignment{},
		&models.Attachment{},
		&models.Comment{},
	)
	if err != nil {
		log.Fatalf("failed to AutoMigrate: %v", err)
	}

	log.Println("connected to PostgreSQL successfully")
}
