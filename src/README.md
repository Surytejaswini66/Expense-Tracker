# Financial API

A simple financial API for managing transactions, including adding, retrieving, updating, and deleting transactions. The API also supports user authentication using JWT.

## Table of Contents
- [Setup and Run Instructions](#setup-and-run-instructions)
- [API Documentation](#api-documentation)
- [Postman Screenshots](#postman-screenshots)

### Prerequisites
- Node.js (version 14 or higher)
- npm (Node package manager)

## Setup and Run Instructions
1.Install the dependencies:
npm install
2.Create a .env file in the root directory and add your configuration:
JWT_SECRET=your_secret_key_here
JWT_EXPIRATION=1h
3.Start the server:
npm start
## API Documentation
Authentication:
Login
-Endpoint: /transactions/login
-Method: POST
-Request Body:
{
    "username": "testUser",
    "password": "password"
}
-Response:
-Success (200):
{
    "token": "your_jwt_token"
}
-Error (403):
{
    "message": "Invalid credentials"
}
## Transactions
## Add Transaction:
1.Endpoint: /transactions
2.Method: POST
3.Headers:
-Authorization: Bearer your_jwt_token
4.Request Body:
{
    "type": "income",
    "category": "salary",
    "amount": 1000,
    "date": "2024-01-01",
    "description": "Monthly salary"
}
5.Response:
-Success (201):
{
    "id": 1,
    "type": "income",
    "category": "salary",
    "amount": 1000,
    "date": "2024-01-01",
    "description": "Monthly salary"
}
## Get Transactions
1.Endpoint: /transactions
2.Method: GET
3.Headers:
-Authorization: Bearer your_jwt_token
4.Response:
-Success (200):
[
    {
        "id": 1,
        "type": "income",
        "category": "salary",
        "amount": 1000,
        "date": "2024-01-01",
        "description": "Monthly salary"
    }
]
## Get Transaction by ID
1.Endpoint: /transactions/:id
2.Method: GET
3.Headers:
-Authorization: Bearer your_jwt_token
4.Response:
-Success (200):
{
    "id": 1,
    "type": "income",
    "category": "salary",
    "amount": 1000,
    "date": "2024-01-01",
    "description": "Monthly salary"
}
## Update Transaction
1.Endpoint: /transactions/:id
2.Method: PUT
3.Headers:
-Authorization: Bearer your_jwt_token
4.Request Body:
{
    "type": "expense",
    "category": "bills",
    "amount": 200,
    "date": "2024-01-02",
    "description": "Monthly electricity bill"
}
5.Response:
-Success (200):
{
    "changes": 1
}
## Delete Transaction
1.Endpoint: /transactions/:id
2.Method: DELETE
3.Headers:
-Authorization: Bearer your_jwt_token
4.Response:
-Success (200):
{
    "deleted": 1
}
## Get Summary
1.Endpoint: /transactions/summary
2.Method: GET
3.Headers:
-Authorization: Bearer your_jwt_token
4.Response:
-Success (200):
{
    "totalIncome": 1000,
    "totalExpenses": 200,
    "balance": 800
}

## Postman Screenshots
1. Login

2. Add Transaction

3. Get Transactions

4. Update Transaction

5. Delete Transaction

6. Get Summary

C:\Users\Dell\Pictures\Screenshots\Screenshot (212).png
C:\Users\Dell\Pictures\Screenshots\Screenshot (211).png
### Installation

1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd financial-api

This `README.md` file provides clear instructions on setting up and using your Financial API, along with documentation for all API endpoints and Postman examples!