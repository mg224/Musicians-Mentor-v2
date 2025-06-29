# Musician's Mentor

Musician's Mentor is a full-stack platform that facilitates the connecting of young student musicians to experienced student musicians to find affordable music lessons and mentorship. The private teaching landscape in music, particularly at the high school level, has gotten increasingly expensive and inaccesbile to many. Musician's Mentor bridges this gap by managing an exclusive database of student teachers from top programs across the nation. Students can sign up for an account and browse the directory of teachers to find one who matches their current needs.

## Features

- **Supabase PostgreSQL Database:** Stores detailed information about users/students/teachers.
- **Spring Boot Backend:** Provides a robust RESTful API to manage user/student/teacher data efficiently. The backend is packaged as a Dockerfile and hosted on Heroku.
- **React.js Frontend:** A user-friendly interface for completing profiles and searching the teacher database. The frontend is hosted on Vercel.

## Prerequisites

Before running this project locally, ensure you have the following installed:

- Java Development Kit (JDK) 8 or higher
- Node.js and npm (Node Package Manager)
- Supabase PostgreSQL database
- IDE (IntelliJ IDEA, Eclipse, VS Code, etc.)

## Installation

### Backend Setup

1. Clone this repository.
2. Open the `musiciansmentorbackend` directory in your preferred IDE.
3. Configure the `application.properties` file in the `src/main/resources` directory with your Supabase database credentials and Email credentials (This application uses Supabase and JWT Authentication and Java Mail Sender, so you'll need to configure the necessary details for these fields).
4. Run the Spring Boot application.

### Frontend Setup

1. Navigate to the `musiciansmentorfrontend` directory in your terminal.
2. Run `npm install` to install the necessary dependencies.
3. Update the `src/config.js` file with the appropriate backend API URL.
4. Run `npm start` to start the ReactJS application.

## Usage

- Access the frontend application via `http://localhost:3000`.
- Use the provided API endpoints to perform CRUD operations on the database:


