const request = require('supertest');
const express = require('express');
const authRoute = require('../routes/auth');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';
const errorHandler = require('../middleware/errorHandler');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoute);
app.use(errorHandler);

describe('Auth API', () => {
  it('should log in user and return accessToken and refreshToken', async () => {
    const loginData = {
      email: 'alice@example.com',
      password: 'password123',
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(loginData)
      .set('Accept', 'application/json');

    const { accessToken } = res.body;
    const decoded = jwt.verify(accessToken, SECRET_KEY);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('accessToken');
    expect(res.body).toHaveProperty('refreshToken');
    expect(decoded).toHaveProperty('id');
    expect(decoded).toHaveProperty('email', loginData.email);
  });

  it('should deny login and return an invalid credentials error', async () => {
    const invalidLogin = {
      email: 'invalidLogin@example.com',
      password: 'mockpassword',
    };

    const res = await request(app)
      .post('/api/auth/login')
      .send(invalidLogin)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/invalid credentials/i);
  });

  it('should return a new access token when a valid refresh token is provided', async () => {
    const loginData = {
      email: 'alice@example.com',
      password: 'password123',
    };

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send(loginData)
      .set('Accept', 'application/json');

    const { refreshToken } = loginRes.body;

    const refreshRes = await request(app)
      .post('/api/auth/refresh')
      .send({ refreshToken })
      .set('Accept', 'application/json');

    const { accessToken } = refreshRes.body;
    const decoded = jwt.verify(accessToken, SECRET_KEY);

    expect(decoded).toHaveProperty('id');
    expect(decoded).toHaveProperty('email', loginData.email);
  });

  it('should not return a new access token when an invalid refresh token is provided', async () => {
    const res = await request(app)
      .post('/api/auth/refresh')
      .send({ refreshToken: 'invalidtoken123' })
      .set('Accept', 'application/json');

    const { accessToken } = res.body;

    expect(accessToken).toBe(undefined);
    expect(res.statusCode).toBe(403);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/invalid refresh token/i);
  });

  it('should not return a new access token when a efresh token is not provided', async () => {
    const res = await request(app)
      .post('/api/auth/refresh')
      .send({ noRefreshToken: 'noRefreshToken' })
      .set('Accept', 'application/json');

    const { accessToken } = res.body;

    expect(accessToken).toBe(undefined);
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/no refresh token/i);
  });
});
