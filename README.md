# PassportJS Authentication Project

This is a trial project for implementing user authentication in a Node.js application. The project uses **PassportJS** for authentication with both **Local Strategy** and **Google OAuth 2.0** and is built with **Node.js**, **Express**, **MongoDB**, **EJS**, and **bcrypt** for secure password hashing.

## Features

- User authentication with **email and password** using Passport Local Strategy.
- **Google OAuth 2.0** authentication for users to log in with their Google accounts.
- Session management with **express-session**, storing sessions in MongoDB.
- **Flash messages** for user notifications on success or error.
- **bcrypt** for securely hashing user passwords.

## Tech Stack

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **MongoDB** - Database to store user and session data
- **Passport.js** - Authentication middleware
- **EJS** - Template engine for rendering views
- **bcrypt** - Library for hashing passwords

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/LaZyFee/Auth_using_PassportJS.git
    cd your-repo-name
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Set up environment variables:

    - Create a `.env` file in the project root with the following variables:

      ```bash
      MONGO_URI=your_mongodb_connection_string
      GOOGLE_CLIENT_ID=your_google_client_id
      GOOGLE_CLIENT_SECRET=your_google_client_secret
      SESSION_SECRET=your_session_secret
      ```

4. Start the MongoDB server (if running locally):

    ```bash
    mongod
    ```

5. Run the project:

    ```bash
    npm start
    ```

   The application will be available at `http://localhost:3000`.

## Project Structure

- **app.js** - Main application file that configures and starts the Express server.
- **config/** - Contains configuration files for Passport strategies and MongoDB connection.
- **controllers/** - Contains controllers for handling user actions.
- **models/** - Contains MongoDB schema definitions.
- **views/** - Contains EJS templates for rendering pages.

## Authentication

### Local Authentication

Users can sign up with an email and password. Passwords are securely hashed using `bcrypt` before being stored in the database.

### Google OAuth 2.0

Users can log in using their Google account credentials. This integration is implemented using Passport’s Google OAuth 2.0 strategy.

## Routes

- `/register` - Sign-up page.
- `/login` - Login page.
- `/auth/google` - Route for Google authentication.
- `/profile` - Protected route for the user profile. Only accessible after login.
- `/logout` - Route to log out and end the session.

## Usage

1. **Sign Up:** Go to `/register` to create a new account using email and password.
2. **Login:** Use either the email/password form on `/login` or the **Login with Google** option.
3. **Profile:** After logging in, access your profile at `/profile`.
4. **Logout:** Log out by visiting `/logout`.

## License

This project is licensed under the MIT License.

## Acknowledgments

- [PassportJS Documentation](http://www.passportjs.org/docs/) - Authentication strategies and setup.
- [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2) - Google authentication setup and usage.
