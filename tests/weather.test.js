const request = require('supertest');
const app = require('../server.js'); // The Express app

describe('Weather API', () => {
  it('should return JSON weather data for valid city', async () => {
    const response = await request(app).get('/weather').query({ city: 'London' });
    
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.body).toHaveProperty('temperature');
    expect(response.body).toHaveProperty('description');
    expect(response.body).toHaveProperty('humidity');
    expect(response.body).toHaveProperty('windSpeed');
    expect(response.body).toHaveProperty('iconUrl');

    // Check types
    expect(typeof response.body.temperature).toBe('number');
    expect(typeof response.body.description).toBe('string');
    expect(typeof response.body.humidity).toBe('number');
    expect(typeof response.body.windSpeed).toBe('number');
    expect(typeof response.body.iconUrl).toBe('string');

    // Check values range
    expect(response.body.temperature).toBeGreaterThanOrEqual(-10);
    expect(response.body.temperature).toBeLessThanOrEqual(40);
    expect(response.body.humidity).toBeGreaterThanOrEqual(20);
    expect(response.body.humidity).toBeLessThanOrEqual(100);
    expect(response.body.windSpeed).toBeGreaterThanOrEqual(0);
    expect(response.body.windSpeed).toBeLessThanOrEqual(20);

    // Check description is valid
    const validDescriptions = ['Sunny', 'Rainy', 'Cloudy', 'Snowy'];
    expect(validDescriptions).toContain(response.body.description);
  });

  it('should return error for empty city', async () => {
    const response = await request(app).get('/weather').query({});

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('City name is required');
  });
});
