JWT Login System - Angular Frontend

This project is the Angular frontend for a full-stack JWT Login System. It provides a Login page, communicates with the Node.js backend, stores the JWT token, protects the Dashboard route, and provides logout functionality.

Technologies Used

- Angular
- TypeScript
- HTML
- CSS
- Angular Router
- HttpClient
- JWT Authentication

Features

- User Login
- Email and Password input
- Login API integration
- JWT token storage
- Protected Dashboard
- Angular Route Guard
- Logout functionality
- Automatic redirection to Login when the user is not authenticated

Project Structure

frontend
│
├── src
│   └── app
│       ├── login
│       │   ├── login.ts
│       │   ├── login.html
│       │   └── login.css
│       │
│       ├── dashboard
│       │   ├── dashboard.ts
│       │   ├── dashboard.html
│       │   └── dashboard.css
│       │
│       ├── auth.guard.ts
│       ├── app.routes.ts
│       ├── app.config.ts
│       ├── app.html
│       └── app.ts
│
├── package.json
├── package-lock.json
└── .gitignore

Backend Connection

The Angular application communicates with the Node.js backend.

Backend URL:

http://localhost:3000

Login API:

POST http://localhost:3000/api/login

Protected Dashboard API:

GET http://localhost:3000/api/dashboard

Login Flow

1. The user opens the Login page.
2. The user enters an email and password.
3. Angular sends the login details to the backend.
4. The backend validates the credentials using the database.
5. The backend generates a JWT token after successful authentication.
6. Angular receives the token.
7. The token is stored in browser local storage.
8. The user is redirected to the Dashboard.
9. The JWT token is sent when accessing the protected Dashboard API.

Route Protection

The Dashboard route is protected using an Angular route guard.

The guard checks whether a JWT token exists in local storage.

If a token exists:

Access Dashboard

If a token does not exist:

Redirect to Login

Dashboard route:

/dashboard

Logout

When the user clicks the Logout button:

1. The JWT token is removed from local storage.
2. The user is redirected to the Login page.
3. The protected Dashboard cannot be accessed without authentication.

Installation

Make sure Node.js and Angular CLI are installed.

Open a terminal inside the "frontend" folder.

Install the required packages:

npm install

Run the Application

Start the Angular development server:

ng serve

The application will normally run at:

http://localhost:4200

Open the Login page:

http://localhost:4200/login

Backend Requirement

The Node.js backend must also be running for login and Dashboard API requests to work.

Start the backend from the backend folder:

node server.js

The backend runs at:

http://localhost:3000

Testing

Valid Login

Enter valid database credentials on the Login page.

Expected result:

Login → JWT Token → Dashboard

Invalid Login

Enter incorrect credentials.

Expected result:

Login failed

Protected Route

Try to open:

http://localhost:4200/dashboard

without logging in.

Expected result:

Redirect to Login

Logout

Click Logout from the Dashboard.

Expected result:

Logout → Login page

Important Note

This frontend is developed as part of a training/demo JWT authentication project. The backend currently handles authentication and database validation.

For a production application, additional security measures such as secure token handling, HTTPS, password hashing, environment variables, and appropriate authentication practices should be implemented.
