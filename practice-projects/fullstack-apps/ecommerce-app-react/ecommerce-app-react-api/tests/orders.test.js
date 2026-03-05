const request = require('supertest');
const express = require('express');
const ordersRoute = require('../routes/orders');
const ordersData = require('../data/ordersData');
const errorHandler = require('../middleware/errorHandler');

const app = express();
app.use(express.json());
app.use('/api/orders/', ordersRoute);
app.use(errorHandler);

describe('Orders API', () => {
  it('should return an array of orders', async () => {
    const res = await request(app).get('/api/orders');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return a single order', async () => {
    const res = await request(app).get('/api/orders/1');

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(1);
    expect(res.body).toMatchObject({
      id: 1,
      userId: 1,
      total: expect.any(Number),
      status: expect.any(String),
      products: expect.any(Array),
      createdAt: expect.any(String),
    });
  });

  it('should return status 404 and a message if the order does not exist', async () => {
    const res = await request(app).get('/api/orders/999');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/not found/i);
  });

  it('should create a new order', async () => {
    const order = {
      userId: 2,
      products: [{ productId: 1, quantity: 2 }],
      status: 'completed',
      createdAt: new Date().toISOString(),
    };

    const res = await request(app)
      .post('/api/orders')
      .send(order)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body.order).toHaveProperty('id');
    expect(Array.isArray(res.body.order.products)).toBe(true);
    expect(res.body.order.userId).toBe(order.userId);
    expect(res.body.order.status).toBe(order.status);
    expect(res.body.order.total).toEqual(expect.any(Number));
    expect(new Date(res.body.order.createdAt).toISOString()).toBeTruthy();
  });

  it('should replace old order with a new one', async () => {
    const newOrder = {
      userId: 1,
      products: [{ productId: 1, quantity: 2 }],
      status: 'completed',
      createdAt: new Date().toISOString(),
    };

    const res = await request(app)
      .put('/api/orders/1')
      .send(newOrder)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(200);
    expect(res.body.order.id).toBe(1);
    expect(res.body.order.total).toEqual(expect.any(Number));
    expect(Array.isArray(res.body.order.products)).toBe(true);
    expect(new Date(res.body.order.createdAt).toISOString).toBeTruthy();
    expect(res.body.order.status).toBe(newOrder.status);
  });

  it('should return 404 and an error message when trying to put a product that does not exist', async () => {
    const dummyOrderData = {
      userId: 1,
      products: [{ productId: 1, quantity: 2 }],
      status: 'completed',
    };

    const res = await request(app)
      .put('/api/orders/999')
      .send(dummyOrderData)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/not found/i);
  });

  it('should delete order', async () => {
    const totalOrders = ordersData.length;

    const deleteRes = await request(app).delete('/api/orders/1');
    const getRes = await request(app).get('/api/orders/1');
    const getAllRes = await request(app).get('/api/orders');

    expect(deleteRes.statusCode).toBe(200);
    expect(getRes.statusCode).toBe(404);
    expect(getAllRes.body.length).toBe(totalOrders - 1);
  });
});
