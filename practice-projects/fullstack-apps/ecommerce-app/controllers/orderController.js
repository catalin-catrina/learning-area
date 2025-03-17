const orders = require('../data/ordersData');
const products = require('../data/productsData');
const CustomError = require('../utils/customError');

exports.getAllOrders = (req, res) => {
  const { userId } = req.query;
  let filteredOrders = orders;

  if (userId) {
    filteredOrders = orders.filter(o => o.userId === parseInt(userId));
  }

  res.json(filteredOrders);
};

exports.getOrderById = (req, res, next) => {
  const orderId = parseInt(req.params.id);
  const order = orders.find(u => u.id === orderId);

  if (order) {
    res.json(order);
  } else {
    return next(new CustomError('Order not found', 404));
  }
};

exports.createOrder = (req, res) => {
  const orderData = req.body;

  let total = 0;

  orderData.products.forEach(item => {
    const product = products.find(product => product.id === item.productId);
    if (product) {
      total += product.price * item.quantity;
    }
  });

  const newOrder = {
    id: orders.length + 1,
    userId: orderData.userId,
    products: orderData.products,
    total: total,
    status: orderData.status,
    createdAt: new Date().toISOString(),
  };

  orders.push(newOrder);
  res
    .status(201)
    .json({ message: 'Order created successfully', order: newOrder });
};

exports.editOrder = (req, res, next) => {
  const orderId = parseInt(req.params.id);
  const orderData = req.body;

  let total = 0;

  orderData.products.forEach(item => {
    const product = products.find(product => product.id === item.productId);
    if (product) {
      total += product.price * item.quantity;
    }
  });

  const index = orders.findIndex(u => u.id === orderId);

  if (index === -1) {
    return next(new CustomError('Order not found', 404));
  }

  orders[index] = {
    id: orderId,
    userId: orderData.userId,
    products: orderData.products,
    total: total,
    status: orderData.status,
    createdAt: new Date().toISOString(),
  };

  res.status(200).json({
    message: 'Order updated successfully',
    order: orders[index],
  });
};

exports.deleteOrder = (req, res, next) => {
  const orderId = parseInt(req.params.id);

  const index = orders.findIndex(u => u.id === orderId);

  if (index === -1) {
    return next(new CustomError('Order not found', 404));
  }

  orders.splice(index, 1);

  res.status(200).json('Order deleted successfully');
};
