const request = require('supertest');
const app = require('../server');

describe('Weather API', () => {
  describe('GET /api/weather/cities', () => {
    test('should return list of cities', async () => {
      const response = await request(app).get('/api/weather/cities');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('cities');
      expect(Array.isArray(response.body.cities)).toBeTruthy();
      expect(response.body.cities.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/weather/current', () => {
    test('should return current weather for Tehran', async () => {
      const response = await request(app).get('/api/weather/current?city=Tehran');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('temp');
      expect(response.body).toHaveProperty('feels_like');
      expect(response.body).toHaveProperty('humidity');
      expect(response.body).toHaveProperty('wind');
      expect(response.body).toHaveProperty('description');
      expect(response.body).toHaveProperty('icon');
    });

    test('should return 400 if city is missing', async () => {
      const response = await request(app).get('/api/weather/current');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test('should return 404 for non-existent city', async () => {
      const response = await request(app).get('/api/weather/current?city=NonExistentCity');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /api/weather/forecast', () => {
    test('should return forecast for Tehran', async () => {
      const response = await request(app).get('/api/weather/forecast?city=Tehran');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBeTruthy();
      expect(response.body.length).toBe(5);
      response.body.forEach(day => {
        expect(day).toHaveProperty('date');
        expect(day).toHaveProperty('high');
        expect(day).toHaveProperty('low');
        expect(day).toHaveProperty('description');
        expect(day).toHaveProperty('icon');
      });
    });

    test('should return 400 if city is missing', async () => {
      const response = await request(app).get('/api/weather/forecast');
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    test('should return 404 for non-existent city', async () => {
      const response = await request(app).get('/api/weather/forecast?city=NonExistentCity');
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });
  });
});
