const fs = require('fs');
const path = require('path');

const mockDataPath = path.join(__dirname, '../data/mockWeather.json');

let mockData;

try {
  mockData = JSON.parse(fs.readFileSync(mockDataPath, 'utf8'));
} catch (error) {
  console.error('Error loading mock data:', error);
  process.exit(1);
}

const getCities = (req, res) => {
  res.json({ cities: mockData.cities });
};

const getCurrentWeather = (req, res) => {
  const { city } = req.query;
  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }
  const cityData = mockData[city];
  if (!cityData) {
    return res.status(404).json({ error: 'City not found' });
  }
  res.json(cityData.current);
};

const getForecast = (req, res) => {
  const { city } = req.query;
  if (!city) {
    return res.status(400).json({ error: 'City parameter is required' });
  }
  const cityData = mockData[city];
  if (!cityData) {
    return res.status(404).json({ error: 'City not found' });
  }
  res.json(cityData.forecast);
};

module.exports = {
  getCities,
  getCurrentWeather,
  getForecast
};
