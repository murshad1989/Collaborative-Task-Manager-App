# Collaborative Task Manager App

A collaborative task management application built with Node.js, React, and MySQL.

## Features

- User Authentication (Register, Login, Forgot Password)
- Task Management (Create, Read, Update, Delete)
- Real-time Notifications
- Collaborative Task Sharing
- User Profile Management

## Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm or yarn

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/Collaborative-Task-Manager-App.git
   cd Collaborative-Task-Manager-App
   ```

2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Install frontend dependencies:
   ```bash
   cd ../task-manager-frontend
   npm install
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env` in the backend directory
   ```bash
   cd ../backend
   cp .env.example .env
   ```
   - Update the `.env` file with your configuration:
     - Database credentials
     - JWT secret
     - SMTP settings for email
     - Other environment-specific variables

5. Set up the database:
   - Create a MySQL database
   - Import the schema from `database.sql`

## Running the Application

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend development server:
   ```bash
   cd ../task-manager-frontend
   npm start
   ```

3. Access the application at `http://localhost:3000`

## Development

- Backend API runs on `http://localhost:5000`
- Frontend development server runs on `http://localhost:3000`
- MySQL database runs on default port `3306`

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
