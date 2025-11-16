# Weather App

A simple single-page weather app built with Node.js, Express, and Tailwind CSS. This app generates mock weather data for demonstration purposes.

## Features

- Fetch weather data by city name
- Responsive design with Tailwind CSS
- Loading indicator
- Error handling for invalid city names
- Recent search history (stored in sessionStorage)
- Background changes based on weather condition

## Installation

1. Clone the repository:
   ```
   git clone <repo-url>
   cd weather-app
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Usage

1. Start the server:
   ```
   npm start
   ```

2. Open your browser and navigate to `http://localhost:3000`

3. Enter any city name and click "Get Weather" to see random mock weather data (e.g., London, Tokyo, New York)

## Running Tests

To run the automated tests:
```
npm test
```

Tests cover the backend API routes using Jest and Supertest.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, Vanilla JavaScript, Tailwind CSS (via CDN)
- **Testing**: Jest, Supertest

## Project Structure

```
weather-app/
├── server.js          # Express server
├── public/
│   ├── index.html     # Main HTML page
│   └── app.js         # Frontend JavaScript
├── tests/
│   └── weather.test.js # Jest tests
├── package.json
└── README.md          # This file
```

Enjoy the weather app!
