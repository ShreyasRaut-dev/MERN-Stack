# Task: Authentication with JWT

Problem Statement:
Your task is to implement authentication in an Express.js application using JSON Web Tokens (JWT) and create a React frontend to handle user registration, login, and access to a protected route.

Problem Description:
In this task, you will create an Express.js application that handles user authentication using JWT. You will implement middleware to protect certain routes and ensure that only authenticated users can access them. You will also create a React frontend for user registration, login, and accessing the protected route.

Your Express.js application should include the following features:
User registration route (/register) that accepts username and password, and stores user data in an array.
User login route (/login) that validates user credentials and returns a JWT upon successful authentication.
A protected route (/protected) that requires a valid JWT to access.

Your React application should include the following features:
Forms for user registration and login.
Functionality to store the JWT in local storage upon successful login.
Access to the protected route using the stored JWT
