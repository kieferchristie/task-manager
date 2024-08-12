# Backend Project

## Overview
This is a backend project built with Node.js and Express. It provides user authentication and basic CRUD operations for managing tasks.

## Features
-**User Authentication:** Register and log in with JWT-based authentication.
- **Task Management:** Perform CRUD operations (Create, Read, Update, Delete) for tasks.
- **Testing:** Comprehensive tests using Jest and MongoDB in-memory server for isolated testing.
- **Error Handling:** Centralized error handling for consistent API responses.
- **Logging:** Console logging for important actions and errors.

## Installation

### Prerequisites
- Node.js
- MongoDB

### Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/your-repository-name.git
   cd your-repository-name
2. Install dependencies
   npm install
3. Create a '.env' file in the root directory and add the following:
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
4. npm start

#### Running Test
1. Run all Test:
   npm test
2. Run tests with open handles detection:
   npm test -- --detectOpenHandles