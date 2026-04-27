# Mawazine Event Management API

[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/Adnane13-debug/Gestion_Events_Mawazine.git)

This project is a RESTful API for managing the events of the Mawazine festival. Built with Node.js, Express, and MongoDB, it provides a comprehensive backend system for handling stages, artists, concerts, and user accounts. The API features JWT-based authentication and role-based access control to distinguish between regular users and administrators.

## Features

-   **User Authentication**: Secure user registration and login using JSON Web Tokens (JWT).
-   **Role-Based Access Control**: Differentiates between `user` (read-only) and `admin` (full CRUD) roles.
-   **Stage Management**: CRUD operations for festival stages.
-   **Artist Management**: CRUD operations for artists, with assignment to specific stages.
-   **Concert Management**: CRUD operations for concert schedules, linking artists to dates and times.
-   **Data Filtering**: Endpoints support filtering and searching to easily find specific artists, stages, or concerts.
-   **Data Population**: Automatically populate related data (e.g., retrieving an artist's stage details or a concert's artist information).

## Tech Stack

-   **Backend**: Node.js, Express.js
-   **Database**: MongoDB with Mongoose ODM
-   **Authentication**: JSON Web Tokens (jsonwebtoken), bcryptjs for password hashing
-   **Environment Management**: dotenv
-   **Development**: nodemon for live server reloading

## Getting Started

Follow these instructions to get a local copy of the project up and running.

### Prerequisites

-   Node.js (v14 or higher)
-   npm
-   MongoDB (local instance or a cloud service like MongoDB Atlas)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/adnane13-debug/gestion_events_mawazine.git
    cd gestion_events_mawazine
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables. Replace the placeholder values with your own.

    ```env
    # Server configuration
    PORT=3000

    # MongoDB connection string
    MONGO_URI=mongodb://localhost:27017/mawazine_db

    # JWT configuration
    JWT_SECRET=your_jwt_secret_key
    ```

### Running the Application

-   **Development Mode**: Starts the server using `nodemon`, which will automatically restart on file changes.
    ```sh
    npm run dev
    ```

-   **Production Mode**: Starts the server using `node`.
    ```sh
    npm start
    ```

The server will be running on `http://localhost:3000`.

## API Endpoints

All endpoints are prefixed with `/api`. Authentication is required for all endpoints except `register` and `login`. Protected endpoints require a JWT to be included in the `Authorization` header as a Bearer token.

```
Authorization: Bearer <your_jwt_token>
```

### Authentication (`/api/auth`)

| Method | Endpoint         | Description                   |
| :----- | :--------------- | :---------------------------- |
| `POST` | `/register`      | Registers a new user.         |
| `POST` | `/login`         | Logs in a user and returns a JWT. |

### Stages (`/api/stages`)

| Method   | Endpoint  | Description                          | Access      |
| :------- | :-------- | :----------------------------------- | :---------- |
| `GET`    | `/`       | Get all stages. Supports `?name=` query. | User, Admin |
| `GET`    | `/:id`    | Get a single stage by its ID.        | User, Admin |
| `POST`   | `/`       | Create a new stage.                  | Admin       |
| `PUT`    | `/:id`    | Update a stage by its ID.            | Admin       |
| `DELETE` | `/:id`    | Delete a stage by its ID.            | Admin       |

### Artists (`/api/artists`)

| Method   | Endpoint  | Description                                              | Access      |
| :------- | :-------- | :------------------------------------------------------- | :---------- |
| `GET`    | `/`       | Get all artists. Supports `?name=` & `?genre=` queries. | User, Admin |
| `GET`    | `/:id`    | Get a single artist by their ID.                         | User, Admin |
| `POST`   | `/`       | Create a new artist.                                     | Admin       |
| `PUT`    | `/:id`    | Update an artist by their ID.                            | Admin       |
| `DELETE` | `/:id`    | Delete an artist by their ID.                            | Admin       |

### Concerts (`/api/concerts`)

| Method   | Endpoint  | Description                                 | Access      |
| :------- | :-------- | :------------------------------------------ | :---------- |
| `GET`    | `/`       | Get all concerts. Supports `?date=` query. | User, Admin |
| `GET`    | `/:id`    | Get a single concert by its ID.             | User, Admin |
| `POST`   | `/`       | Create a new concert.                       | Admin       |
| `PUT`    | `/:id`    | Update a concert by its ID.                 | Admin       |
| `DELETE` | `/:id`    | Delete a concert by its ID.                 | Admin       |
