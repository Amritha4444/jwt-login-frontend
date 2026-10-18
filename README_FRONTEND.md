JWT Login System — Angular Frontend

This project is the Angular frontend for a full-stack JWT authentication system. It provides Login, Signup, and Dashboard functionality and communicates with a Node.js, Express, TypeScript, and SQLite backend.

Technologies Used

- Angular
- TypeScript
- HTML and CSS
- Angular Router
- HttpClient
- JWT Authentication
- HTTP Interceptors
- Route Guards

Features

- User Login and Signup
- Email and Password validation
- Login and Signup API integration
- JWT token storage
- HTTP authentication interceptor
- Protected Dashboard route
- Angular Route Guard
- Logout functionality
- Automatic redirection to Login when authentication is required

Project Structure

frontend/
├── src/
│   ├── app/
│   │   ├── core/
│   │   │   └── auth/
│   │   │       ├── auth.service.ts
│   │   │       ├── auth.guard.ts
│   │   │       └── auth.interceptor.ts
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── signup.ts
│   │   ├── signup.html
│   │   ├── signup.css
│   │   ├── app.routes.ts
│   │   ├── app.config.ts
│   │   ├── app.ts
│   │   └── app.html
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   └── main.ts
├── angular.json
├── package.json
├── package-lock.json
└── README.md

Note: The structure above is a reference. The actual files in the repository may differ.

Backend Connection

The Angular application communicates with a Node.js and Express backend.

Default backend URL:

"http://localhost:3000"

Authentication API base URL:

"http://localhost:3000/api/auth"

API Endpoints

Method| Endpoint| Purpose
POST| "/api/auth/login"| Authenticate a user
POST| "/api/auth/signup"| Register a new user
GET| "/api/auth/me"| Retrieve the authenticated user's details

Backend API Configuration

The frontend API URL is configured in the Angular environment file.

Default development API URL:

"http://localhost:3000/api"

The backend port is configured using the "PORT" variable in the backend ".env" file. The frontend API URL must match the backend port.

For example, if the backend uses "PORT=3000", the frontend should connect to "http://localhost:3000/api".

If the backend port changes, update the frontend API URL accordingly.

The backend ".env" file contains private configuration and must not be committed to GitHub. Use ".env.example" to document the required environment variables.

Never put the real "JWT_SECRET" in the frontend.

Login Flow

1. The user opens the Login page.
2. The user enters an email address and password.
3. Angular validates the input.
4. Angular sends the login request to the backend.
5. The backend validates the credentials using SQLite.
6. The backend verifies the password using bcrypt.
7. The backend generates a JWT after successful authentication.
8. Angular receives the authentication response.
9. The JWT is stored in browser local storage.
10. The user is redirected to the Dashboard.
11. The HTTP interceptor attaches the JWT to protected API requests.

Signup Flow

1. The user opens the Signup page.
2. The user enters an email address and password.
3. Angular validates the input.
4. Angular sends the signup request to the backend.
5. The backend checks whether the email already exists.
6. The password is hashed using bcrypt.
7. The new user is stored in the SQLite database.
8. After successful signup, the user is redirected to the Login page.

Route Protection

The Dashboard route is protected using an Angular route guard.

Dashboard URL:

"http://localhost:4200/dashboard"

The guard checks whether an authentication token exists.

- If a token exists, the guard allows navigation.
- If a token does not exist, the guard redirects the user to Login.

The backend also protects the "/api/auth/me" endpoint by validating the JWT. The frontend route guard does not replace backend authentication.

JWT HTTP Interceptor

The application uses an Angular HTTP interceptor to centralize authentication headers.

The interceptor:

1. Reads the JWT from local storage.
2. Adds it to the "Authorization" header.
3. Sends the request to the backend.

Header format:

Authorization: Bearer <JWT_TOKEN>

This avoids manually adding the token in every component.

Logout

When the user clicks Logout:

1. The JWT is removed from local storage.
2. The user is redirected to Login.
3. The protected Dashboard route redirects unauthenticated users to Login.

Installation

Make sure Node.js and Angular CLI are installed.

Open a terminal inside the frontend folder and run:

npm install

Running the Frontend

Start the Angular development server:

npm start

The application normally runs at:

"http://localhost:4200"

Open the Login page:

"http://localhost:4200/login"

Running the Backend

Login, Signup, and Dashboard API requests require the backend to be running.

Open a separate terminal inside the backend folder and run:

npm install
npm run dev

The backend normally runs at:

"http://localhost:3000"

Make sure the backend ".env" file is configured correctly before starting the server.

Testing

Valid Login

Use the demo credentials documented in the backend README, if the demo user is enabled.

Expected flow:

Login
  ↓
Backend validates credentials
  ↓
JWT token returned
  ↓
Dashboard

Invalid Login

Enter an incorrect email address or password.

Expected result: an authentication error message, such as "Invalid email or password".

Signup

Enter a valid email address and password that meet the backend validation rules.

Expected result: the account is created, and the user can proceed to Login.

Protected Route

Log out and try to open:

"http://localhost:4200/dashboard"

Expected result: redirect to Login.

Logout

Click Logout on the Dashboard.

Expected result: the token is removed and the user is redirected to Login.

Environment Configuration

The frontend API URL is configured in the Angular environment file. Use the environment file path that actually exists in the project.

Development API URL:

"http://localhost:3000/api"

The frontend API URL must match the backend host and port. Update it whenever the backend configuration changes.

The real "JWT_SECRET" must remain on the backend and must never be stored in frontend code.

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
- Environment-based configuration