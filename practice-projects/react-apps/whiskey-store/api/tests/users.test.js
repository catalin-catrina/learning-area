const request = require('supertest');
const express = require('express');
const usersRoute = require('../routes/users');
const authRoute = require('../routes/auth');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'your_secret_key';
const errorHandler = require('../middleware/errorHandler');

// Import the in-memory data array
const usersData = require('../data/usersData');

// Create a deep copy of the initial data
const initialUsers = [
  {
    id: 1,
    name: 'Alice Smith',
    email: 'alice@example.com',
    password: 'password123',
  },
  {
    id: 2,
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: 'password123',
  },
  {
    id: 3,
    name: 'Charlie Davis',
    email: 'charlie@example.com',
    password: 'password123',
  },
];

beforeEach(() => {
  usersData.length = 0;

  initialUsers.forEach(user => usersData.push({ ...user }));
});

const app = express();
app.use(express.json());
app.use('/api/users', usersRoute);
app.use('/api/auth', authRoute);
app.use(errorHandler);

describe('Users API', () => {
  it('should retrieve user profile when user is logged in', async () => {
    const loginData = {
      email: 'alice@example.com',
      password: 'password123',
    };
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send(loginData)
      .set('Accept', 'application/json');
    const { accessToken } = loginRes.body;

    const profileRes = await request(app)
      .get('/api/users/profile')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(profileRes.statusCode).toBe(200);
    expect(profileRes.body).toHaveProperty('id');
    expect(profileRes.body).toMatchObject({
      name: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),
    });
  });

  it('should error out when user tries to access profile without providing a token', async () => {
    const res = await request(app).get('/api/users/profile');

    expect(res.statusCode).toBe(501);
    expect(res.body).toHaveProperty('error');
  });

  it('should get all users', async () => {
    const res = await request(app).get('/api/users');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return a single user', async () => {
    const res = await request(app).get('/api/users/1');

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
    expect(res.body).toMatchObject({
      name: expect.any(String),
      email: expect.any(String),
      password: expect.any(String),
    });
  });

  it('should return 404 with an error message when trying to fetch a user id that does not exist', async () => {
    const res = await request(app).get('/api/users/999');

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/not found/i);
  });

  it('should create a new user', async () => {
    const loginData = {
      name: 'Leo',
      email: 'catalincatrina@example.com',
      password: 'password123',
    };
    const res = await request(app)
      .post('/api/users')
      .send(loginData)
      .set('Accept', 'application/json');

    const { accessToken } = res.body;
    const decoded = jwt.verify(accessToken, SECRET_KEY);

    expect(decoded).toHaveProperty('name');
    expect(decoded).toHaveProperty('email');
  });

  it('should edit the user profile with new data', async () => {
    const loginData = {
      email: 'alice@example.com',
      password: 'password123',
    };
    const newUserData = {
      name: 'Leo',
      email: 'catalincatrina@example.com',
    };

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send(loginData)
      .set('Accept', 'application/json');
    const { accessToken } = loginRes.body;

    const editRes = await request(app)
      .put('/api/users/1')
      .send(newUserData)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(editRes.body).toHaveProperty('user');
  });

  it('should not allow the user to edit a profile thats not theirs', async () => {
    const loginData = {
      email: 'alice@example.com',
      password: 'password123',
    };
    const newUserData = {
      name: 'Leo',
      email: 'catalincatrina@example.com',
    };

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send(loginData)
      .set('Accept', 'application/json');
    const { accessToken } = loginRes.body;

    const editRes = await request(app)
      .put('/api/users/2')
      .send(newUserData)
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(editRes.statusCode).toBe(403);
    expect(editRes.body).toHaveProperty('error');
    expect(editRes.body.error).toMatch(/not permitted/i);
  });

  it('should delete user associated with the provided id', async () => {
    const loginData = {
      email: 'alice@example.com',
      password: 'password123',
    };

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send(loginData)
      .set('Accept', 'application/json');

    const { accessToken } = loginRes.body;

    const deleteRes = await request(app)
      .delete('/api/users/1')
      .set('Authorization', `Bearer ${accessToken}`);

    const getRes = await request(app).get('/api/users/1');

    expect(deleteRes.statusCode).toBe(200);
    expect(getRes.statusCode).toBe(404);
  });
});
