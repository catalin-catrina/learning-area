module.exports = [
  {
    id: 1,
    userId: 1,
    products: [
      { productId: 1, quantity: 2 },
      { productId: 2, quantity: 1 },
    ],
    status: 'PENDING',
    createdAt: '2023-01-01T12:00:00Z',
  },
  {
    id: 2,
    userId: 2,
    products: [{ productId: 2, quantity: 1 }],
    status: 'DELIVERED',
    createdAt: '2023-01-02T14:00:00Z',
  },
  {
    id: 3,
    userId: 1,
    products: [
      { productId: 1, quantity: 1 },
      { productId: 3, quantity: 2 },
    ],
    status: 'SHIPPED',
    createdAt: '2023-01-03T09:30:00Z',
  },
];
