const productsData = require("../data/productsData");
const CustomError = require("../utils/customError");

exports.getProducts = (req, res) => {
  let filteredProducts = productsData;

  const ALLOWED_FILTERS = ["region", "type", "country", "inStock"];

  ALLOWED_FILTERS.forEach((key) => {
    if (req.query[key]) {
      filteredProducts = filteredProducts.filter(
        (p) => String(p[key]).toLowerCase() === req.query[key].toLowerCase(),
      );
    }
  });

  if (req.query.minPrice) {
    filteredProducts = filteredProducts.filter(
      (p) => p.price > Number(req.query.minPrice),
    );
  }
  if (req.query.maxPrice) {
    filteredProducts = filteredProducts.filter(
      (p) => p.price <= Number(req.query.maxPrice),
    );
  }

  if (req.query.search) {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(req.query.search.toLowerCase()) ||
        p.distillery.toLowerCase().includes(req.query.search.toLowerCase()),
    );
  }

  if (req.query.sortBy) {
    const sortField = req.query.sortBy;
    const sortOrder = req.query.sortOrder === "desc" ? "desc" : "asc";

    filteredProducts.sort((a, b) => {
      if (
        typeof a[sortField] === "number" &&
        typeof b[sortField] === "number"
      ) {
        return sortOrder === "desc"
          ? b[sortField] - a[sortField]
          : a[sortField] - b[sortField];
      }

      if (
        typeof a[sortField] === "string" &&
        typeof b[sortField] === "string"
      ) {
        return sortOrder === "desc"
          ? b[sortField].localeCompare(a[sortField])
          : a[sortField].localeCompare(b[sortField]);
      }

      return 0;
    });
  }

  const page = req.query.page || 1;
  const limit = req.query.limit || 20;
  const startIndex = (page - 1) * limit;
  const paginated = filteredProducts.slice(startIndex, startIndex + limit);

  const response = {
    data: paginated,
    total: filteredProducts.length,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };

  res.json(response);
};

exports.getFilters = (req, res) => {
  const regions = [...new Set(products.map((p) => p.region))];
  const types = [...new Set(products.map((p) => p.type))];
  const countries = [...new Set(products.map((p) => p.country))];

  const products = productsData;
  const minPrice = Math.min(...products.map((p) => p.price));
  const maxPrice = Math.max(...products.map((p) => p.price));
  const priceRange = { min: minPrice, max: maxPrice };

  const response = { regions, types, countries, priceRange };

  res.json(response);
};

exports.getProductById = (req, res, next) => {
  const product = productsData.find((p) => p.id === parseInt(req.params.id));
  if (product) {
    res.json(product);
  } else {
    return next(new CustomError("Product not found", 404));
  }
};

exports.createProduct = (req, res) => {
  const newProduct = {
    id: products.length + 1, // Simple way to generate an ID
    ...req.body,
  };
  productsData.push(newProduct);
  res.status(201).json(newProduct);
};

exports.putProduct = (req, res, next) => {
  const productId = parseInt(req.params.id);
  const newProductData = req.body;

  const index = productsData.findIndex((p) => p.id === productId);

  if (index === -1) {
    return next(new CustomError("Product not found", 404));
  }

  productsData[index] = { id: productId, ...newProductData };

  res.status(200).json({
    message: "Product updated successfully",
    product: productsData[index],
  });
};

exports.deleteProduct = (req, res, next) => {
  const productId = parseInt(req.params.id);
  const index = productsData.findIndex((p) => p.id === productId);

  if (index === -1) {
    return next(new CustomError("Product not found", 404));
  }

  productsData.splice(index, 1);

  res.status(200).json({ message: "Product deleted successfully" });
};
