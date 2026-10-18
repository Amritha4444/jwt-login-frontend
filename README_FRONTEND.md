JWT Authentication Frontend

An Angular frontend application for user authentication using JWT (JSON Web Tokens). It provides login, signup, protected dashboard access, and NgRx-based authentication state management.

Features

- User login and signup
- Form validation
- JWT-based authentication
- NgRx Store for managing authentication state
- NgRx Actions, Reducer, Selectors, and Effects
- HTTP requests to the backend API
- Authentication interceptor to attach the JWT token
- Protected dashboard access
- Logout functionality
- Authentication state handling for login success and errors

Technologies Used

- Angular
- TypeScript
- NgRx Store
- NgRx Effects
- RxJS
- HTML and CSS
- Angular HttpClient

Project Structure

src/
└── app/
    ├── core/
    │   └── auth/
    │       ├── auth.service.ts
    │       ├── auth.interceptor.ts
    │       ├── auth.guard.ts
    │       └── store/
    │           ├── auth.actions.ts
    │           ├── auth.effects.ts
    │           ├── auth.reducer.ts
    │           └── auth.selectors.ts
    ├── login/
    ├── signup/
    ├── dashboard/
    ├── app.config.ts
    └── app.routes.ts

Prerequisites

Install the following before running the application:

- Node.js and npm
- Angular CLI
- The JWT authentication backend

Installation

Clone the repository:

git clone https://github.com/Amritha4444/jwt-login-frontend.git

Navigate to the project folder:

cd jwt-login-frontend

Install dependencies:

npm install

Backend Configuration

Ensure that the backend is running on "http://localhost:3000".

Configure the API URL in the Angular environment file to match your backend:

apiUrl: 'http://localhost:3000/api'

The authentication service uses this URL to communicate with the backend.

Run the Application

Start the Angular development server:

npx ng serve

Open the application in your browser:

"http://localhost:4200"

NgRx Authentication Flow

1. The user enters their email and password.
2. The login component dispatches a login action.
3. The NgRx Effect calls the backend API through the authentication service.
4. On success, the token and user information are stored in the NgRx state.
5. The JWT token is saved in browser local storage.
6. The authentication interceptor attaches the token to protected API requests.
7. The user can access the dashboard after successful authentication.
8. On failure, the application updates the authentication error state.
9. On logout, the token is removed and the user is redirected to the login page.

Build

To create a production build, run:

npx ng build

The generated files are placed in the "dist/" directory.

Testing

Run the Angular unit tests using:

npx ng test

Backend Repository

"JWT Authentication Backend" (https://github.com/Amritha4444/jwt-login-backend)

Author

Amritha