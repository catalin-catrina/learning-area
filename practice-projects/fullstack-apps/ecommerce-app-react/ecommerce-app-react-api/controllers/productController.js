const products = require('../data/productsData');
const CustomError = require('../utils/customError');

exports.getAllProducts = (req, res) => {
  let filteredProducts = products;

  if (req.query.minPrice) {
    filteredProducts = filteredProducts.filter(
      p => p.price > Number(req.query.minPrice)
    );
  }
  if (req.query.maxPrice) {
    filteredProducts = filteredProducts.filter(
      p => p.price <= Number(req.query.maxPrice)
    );
  }

  const filterKeys = Object.keys(req.query).filter(
    key => !['minPrice', 'maxPrice', 'sortBy', 'sortOrder'].includes(key)
  );
  filterKeys.forEach(key => {
    const filterValue = req.query[key];
    filteredProducts =
      filterValue === 'all'
        ? filteredProducts
        : filteredProducts.filter(
            p => p[key].toLowerCase() === filterValue.toLowerCase()
          );
  });

  if (req.query.sortBy) {
    const sortField = req.query.sortBy;
    const sortOrder = req.query.sortOrder === 'desc' ? 'desc' : 'asc';

    filteredProducts.sort((a, b) => {
      if (
        typeof a[sortField] === 'number' &&
        typeof b[sortField] === 'number'
      ) {
        return sortOrder === 'desc'
          ? b[sortField] - a[sortField]
          : a[sortField] - b[sortField];
      }

      if (
        typeof a[sortField] === 'string' &&
        typeof (b[sortField] === 'string')
      ) {
        return sortOrder === 'desc'
          ? b[sortField].localeCompare(b[sortField])
          : a[sortField].localeCompare(b[sortField]);
      }

      return 0;
    });
  }

  res.json(filteredProducts);
};

exports.getAllCategories = (req, res) => {
  const categories = products.map(p => p.category);

  res.json([...new Set(categories), 'All']);
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
