# Credit Card Validator

A full-stack TypeScript application for validating credit card numbers using the Luhn algorithm. The project includes a backend server for validation and a React frontend for user interaction.

## Features

- **Frontend (React):**
  - User-friendly interface for entering and validating credit card numbers.
  - Displays validation results with clear success or error messages.

- **Backend (Express):**
  - Implements the Luhn algorithm for server-side validation.
  - Exposes RESTful API endpoints.

## Project Structure

credit-card-validator/
├── client/                 # React frontend
│   ├── public/             # Static assets
│   ├── src/                # React components and logic
│   ├── tsconfig.json       # TypeScript config for frontend
│   └── package.json        # Frontend dependencies
├── src/                    # Backend server
│   ├── routes/             # Express routes
│   ├── services/           # Luhn algorithm implementation
│   ├── server.ts           # Main backend server
│   └── tsconfig.json       # TypeScript config for backend
├── dist/                   # Compiled backend files (generated)
├── package.json            # Backend dependencies
└── README.md               # Documentation

## Installation

1. Clone the repository:
   git clone https://github.com/Jpmaloiv/credit-card-validator.git
   cd credit-card-validator

2. Install backend dependencies:
   yarn install

3. Install frontend dependencies:
   cd client
   yarn install

## Development

### Start the Backend
Run the backend server:
yarn dev
The backend will be available at http://localhost:3001.

### Start the Frontend
Run the React development server:
cd client
yarn start
The frontend will be available at http://localhost:3000.

## API Endpoints

### GET /
Returns a simple message to confirm the server is running.

### POST /card/validate
Validates a credit card number using the Luhn algorithm.

**Request Body:**
{
  "cardNumber": "4111111111111111"
}

**Response:**
{
  "success": true,
  "valid": true
}

## Scripts

### Backend
- yarn build: Compiles the backend TypeScript files.
- yarn dev: Runs the backend server in development mode.
- yarn start: Runs the compiled backend server.

### Frontend
- yarn start: Starts the React development server.
- yarn build: Builds the React app for production.

## How It Works

The backend uses the **Luhn algorithm** to validate credit card numbers. The algorithm:
1. Doubles every second digit from the right.
2. Sums the digits (splitting double-digit results).
3. Checks if the total modulo 10 equals 0.

## License

This project is licensed under the [MIT License](LICENSE).