# JWT Login System - Angular Frontend

This project is the Angular frontend for a full-stack JWT authentication system. It provides Login, Signup, and Dashboard functionality and communicates with a Node.js, Express, TypeScript, and SQLite backend.

## Technologies Used

- Angular
- TypeScript
- HTML
- CSS
- Angular Router
- HttpClient
- JWT Authentication

## Features

- User Login
- User Signup
- Email and Password validation
- Login API integration
- Signup API integration
- JWT token storage
- HTTP authentication interceptor
- Protected Dashboard route
- Angular Route Guard
- Logout functionality
- Automatic redirection to Login when authentication is required

## Project Structure

text
frontend
│
├── src
│   ├── app
│   │   ├── login
│   │   │   ├── login.ts
│   │   │   ├── login.html
│   │   │   └── login.css
│   │   │
│   │   ├── dashboard
│   │   │   ├── dashboard.ts
│   │   │   ├── dashboard.html
│   │   │   └── dashboard.css
│   │   │
│   │   ├── auth.service.ts
│   │   ├── auth.interceptor.ts
│   │   ├── auth.guard.ts
│   │   ├── signup.ts
│   │   ├── app.routes.ts
│   │   ├── app.config.ts
│   │   ├── app.ts
│   │   └── app.html
│   │
│   ├── environment.ts
│   └── main.ts
│
├── package.json
├── package-lock.json
└── .gitignore

Backend Connection

The Angular application communicates with the Node.js backend.

Backend base URL:

http://localhost:3000

Authentication API base URL:

http://localhost:3000/api/auth

Login

POST /api/auth/login

Signup

POST /api/auth/signup

Protected User API

GET /api/auth/me

The API URL is configured through "src/environment.ts".

Login Flow

1. The user opens the Login page.
2. The user enters an email and password.
3. Angular validates the input.
4. Angular sends the login details to the backend.
5. The backend validates the credentials using SQLite.
6. The backend verifies the password using bcrypt.
7. The backend generates a JWT token after successful authentication.
8. Angular receives the JWT token.
9. The token is stored in browser local storage.
10. The user is redirected to the Dashboard.
11. The HTTP interceptor automatically adds the JWT token to protected API requests.

Signup Flow

1. The user opens the Signup page.
2. The user enters an email and password.
3. Angular validates the input.
4. Angular sends the signup request to the backend.
5. The backend checks whether the email already exists.
6. The password is securely hashed using bcrypt.
7. The new user is stored in the SQLite database.
8. After successful signup, the user is redirected to the Login page.

Route Protection

The Dashboard route is protected using an Angular route guard.

Dashboard route:

/dashboard

The guard checks whether an authentication token exists.

If a token exists:

Access Dashboard

If a token does not exist:

Redirect to Login

The Dashboard also handles authentication errors by logging the user out and redirecting to Login.

JWT HTTP Interceptor

The application uses an Angular HTTP interceptor.

The interceptor:

1. Reads the JWT token from local storage.
2. Adds the token to the "Authorization" header.
3. Sends the authenticated request to the backend.

The header format is:

Authorization: Bearer <JWT_TOKEN>

This keeps authentication logic centralized instead of manually adding the token in every component.

Logout

When the user clicks Logout:

1. The JWT token is removed from local storage.
2. The user is redirected to the Login page.
3. The protected Dashboard route cannot be accessed without authentication.

Installation

Make sure Node.js and Angular CLI are installed.

Open a terminal inside the frontend folder.

Install the required packages:

npm install

Run the Frontend

Start the Angular development server:

npm start

The application normally runs at:

http://localhost:4200

Open:

http://localhost:4200/login

Backend Requirement

The Node.js backend must also be running for Login, Signup, and Dashboard API requests to work.

Open a terminal inside the backend folder.

Install dependencies:

npm install

For development, start the TypeScript backend with:

npm run dev

The backend runs at:

http://localhost:3000

Testing

Valid Login

Use the demo credentials provided in the backend README.

Expected flow:

Login
   ↓
JWT Token
   ↓
Dashboard

Invalid Login

Enter an incorrect email or password.

Expected result:

Invalid email or password

Signup

Enter a new email and password.

Expected result:

Signup successful
   ↓
Login page

Protected Route

Log out and try to open:

http://localhost:4200/dashboard

Expected result:

Redirect to Login

Logout

Click Logout from the Dashboard.

Expected result:

Logout
   ↓
Login page

Environment Configuration

The frontend API URL is configured in:

src/environment.ts

Current development API URL:

http://localhost:3000/api

This avoids hardcoding the API URL inside individual components.

Project Purpose

This project was developed as part of an internship/training task to demonstrate:

- Angular frontend development
- Node.js and Express API integration
- TypeScript
- JWT authentication
- Route protection
- HTTP interceptors
- SQLite database integration
- Password hashing with bcrypt
- Frontend and backend communication