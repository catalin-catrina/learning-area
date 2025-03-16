const request = require('supertest');
const express = require('express');
const productsRoute = require('../routes/products');
const productsData = require('../data/productsData');
const errorHandler = require('../middleware/errorHandler');

const app = express();
app.use(express.json());
app.use('/api/products', productsRoute);
app.use(errorHandler);

describe('Products API', () => {
  it('should return an array of products', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should return a single product', async () => {
    const res = await request(app).get('/api/products/1');
    expect(res.statusCode).toBe(200);
    expect(res.body).toMatchObject({
      id: 1,
      name: expect.any(String),
    });
  });

  it('should return 404 with an error message when product ID is not found', async () => {
    const res = await request(app).get('/api/products/999');
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/not found/i);
  });

  it('should create a new product', async () => {
    const newProduct = {
      name: 'Test Product',
      description: 'This is a test product',
      price: 100,
      category: 'Test Category',
      reviews: [],
    };

    const res = await request(app)
      .post('/api/products')
      .send(newProduct)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.description).toBe(newProduct.description);
    expect(res.body.price).toBe(newProduct.price);
    expect(res.body.category).toBe(newProduct.category);
    expect(Array.isArray(res.body.reviews)).toBe(true);
  });

  it('should replace old product with a new one', async () => {
    const updatedProduct = {
      name: 'Test Product',
      description: 'This is a test product',
      price: 100,
      category: 'Test Category',
      reviews: [],
    };

    const res = await request(app)
      .put('/api/products/1')
      .send(updatedProduct)
      .set('Accept', 'application/json');

    expect(res.statusCode).toBe(200);
    expect(res.body.product.id).toBe(1);
    expect(res.body.product.description).toBe(updatedProduct.description);
    expect(res.body.product.price).toBe(updatedProduct.price);
    expect(res.body.product.category).toBe(updatedProduct.category);
    expect(Array.isArray(res.body.product.reviews)).toBe(true);
  });

  it('should return 404 with an error message when trying to put a product id that does not exist', async () => {
    const res = await request(app).put('/api/products/999');

    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toMatch(/not found/i);
  });

  it('should delete product', async () => {
    const totalProducts = productsData.length;

    const deleteRes = await request(app).delete('/api/products/1');
    const getSingleRes = await request(app).get('/api/products/1');
    const getAllRes = await request(app).get('/api/products');

    expect(deleteRes.statusCode).toBe(200);
    expect(getSingleRes.statusCode).toBe(404);
    expect(getAllRes.body.length).toBe(totalProducts - 1);
  });
});
