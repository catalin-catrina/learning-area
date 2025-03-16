const products = require('../data/productsData');
const CustomError = require('../utils/customError');

exports.getAllProducts = (req, res) => {
  res.json(products);
};

exports.getProductById = (req, res, next) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    return next(new CustomError('Product not found', 404));
  }
};

exports.createProduct = (req, res) => {
  const newProduct = {
    id: products.length + 1, // Simple way to generate an ID
    ...req.body,
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

exports.putProduct = (req, res, next) => {
  const productId = parseInt(req.params.id);
  const newProductData = req.body;

  const index = products.findIndex(p => p.id === productId);

  if (index === -1) {
    return next(new CustomError('Product not found', 404));
  }

  products[index] = { id: productId, ...newProductData };

  res.status(200).json({
    message: 'Product updated successfully',
    product: products[index],
  });
};

exports.deleteProduct = (req, res, next) => {
  const productId = parseInt(req.params.id);
  const index = products.findIndex(p => p.id === productId);

  if (index === -1) {
    return next(new CustomError('Product not found', 404));
  }

  products.splice(index, 1);

  res.status(200).json({ message: 'Product deleted successfully' });
};
