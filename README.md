# Express-Backend

This project provides a RESTful API for managing courses, trainers, and user operations, using Node.js, Express, and MongoDB. The API allows you to create, read, update, and delete information for courses and trainers, as well as handle user login and operations. 
The project also includes Swagger for API documentation.

## Features

- **CRUD Operations:** Create, read, update, and delete courses and trainers.
- **User Operations:** Handle user login and other operations.
- **Swagger Documentation:** Interactive API documentation available at `/api-docs`.
- **Error Handling:** Robust error handling for all endpoints.

## Getting Started

### Prerequisites

- Node.js (>= 14.x)
- MongoDB (>= 4.x)

### Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/express-backend.git
    cd express-backend
    ```

2. Install dependencies:

    ```sh
    npm install
    ```

3. Locate the `.env` file in the root of the project and add your MongoDB connection string:

    ```env
    MONGO_URI=mongodb://localhost:27017/your-database-name
    ```

4. Start the server:

    ```sh
    npm start
    ```

    The server will start on port `4000` by default.

### API Documentation

Swagger documentation is available at [http://localhost:4000/api-docs/#/](http://localhost:4000/api-docs/#/).
