const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Weather descriptions
const weatherDescriptions = ['Sunny', 'Rainy', 'Cloudy', 'Snowy'];

// Icon mappings (emoji)
const iconMappings = {
  Sunny: '☀️',
  Rainy: '🌧️',
  Cloudy: '☁️',
  Snowy: '❄️'
};

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/weather', (req, res) => {
  const city = req.query.city;
  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  // Mock weather data
  const description = weatherDescriptions[Math.floor(Math.random() * weatherDescriptions.length)];
  const weatherData = {
    temperature: Math.random() * (40 - (-10)) + (-10), // -10 to 40
    description: description,
    humidity: Math.floor(Math.random() * (100 - 20)) + 20, // 20 to 100
    windSpeed: Math.random() * 20, // 0 to 20
    iconUrl: iconMappings[description]
  };

  res.json(weatherData);
});

module.exports = app;

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Weather app listening at http://localhost:${port}`);
  });
}
