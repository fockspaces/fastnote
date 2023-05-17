import request from 'supertest';
import app from '../../../app';

describe('GET /api', () => {
  test('should return status OK', async () => {
    const response = await request(app).get('/api');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: "OK" });
  });
});

describe('GET /api/lambda', () => {
  test('should return custom message', async () => {
    const customMessage = "Test Health Check";
    const response = await request(app).get(`/api/lambda?message=${customMessage}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: customMessage });
  });

  test('should return empty message when message query is not provided', async () => {
    const response = await request(app).get('/api/lambda');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: undefined });
  });
});
