const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');

router.get('/cities', weatherController.getCities);
router.get('/current', weatherController.getCurrentWeather);
router.get('/forecast', weatherController.getForecast);

module.exports = router;
