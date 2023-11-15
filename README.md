# abz.agency-test-assignment for Node.js developer

Test assignment: simple REST API implementation

## Table of Contents

- [Introduction](#introduction)
- [Get Started](#get-started)
- [Description](#description)
- [Technologies](#technologies)
- [Dependencies](#dependencies)
- [Links](#links)

## Introduction

This application aims to create a simple and functional system by implementing a REST API server based on the specifications outlined in the provided API documentation (OpenAPI).

## Get started

1. Clone repository
2. Set dependencies (npm install)
3. Add environment variables to the **.env file** according to the template in **.env.example**
4. Seed fake data with data generator (npm run seed)
5. Run app on dev mode **npm run start:dev**. Your server run on localhost:3000

Use [Links](#links) to test app on web-service with Swagger API documentation or visit simple frontend app to make request to backend.

## Description

This program creates a REST API server based on OpenAPI documentation. It includes a data generator for seeding the database, processes POST requests by cropping and optimizing images, and implements a basic frontend to showcase server functionality, displaying a user list and an "Add New User" form with server-side validation

## Technologies

For this project were used:

- Node.js

- Express.js

- MongoDB (Mongoose)

- onrender.com - resource for deployment

## Other dependencies

- multer - for file upload
- tinify, sharp - for image validation and optimization
- cloudinary - cloud image storage
- jsonwebtoken - JWT implementation
- bcryptjs - password hashing
- joi - request body validation
- cors - available cross-domain requests
- dotenv - available environment variables
- morgan - format logging
- swagger-ui-express - for API documentation with live test
- faker-js - for fake data creation

## Links

- https://abz-agency-ta.onrender.com/api-docs - link for API Docs with live test <br/> \* If you receive a **504 Gateway Timeout** error, you should retry the request because the hosting takes some time to load. <br/> Free instance web-service spin down with inactivity.
- https://oleksandrkochenko.github.io/abz.agency-test-frontend/ - simply frontend app deployed on GitHub for testing requests
- https://github.com/OleksandrKochenko/abz.agency-test-frontend - repository of frontend app
- https://abz-agency-ta.onrender.com - base URL
