const productSchema = require("../validators/productValidator");
const CustomError = require("../utils/customError");
const { prisma } = require("../lib/prisma");

exports.getProducts = async (req, res, next) => {
  try {
    const ALLOWED_FILTERS = ["region", "type", "country", "inStock", "rating"];

    const where = ALLOWED_FILTERS.reduce((acc, key) => {
      if (req.query[key]) {
        if (req.query[key] === "true") {
          acc[key] = true;
        } else if (req.query[key] === "false") {
          acc[key] = false;
        } else if (key === "rating") {
          acc[key] = parseFloat(req.query[key]);
        } else {
          acc[key] = req.query[key];
        }
      }
      return acc;
    }, {});

    if (req.query.minPrice) {
      where.price = { ...where.price, gte: parseFloat(req.query.minPrice) };
    }
    if (req.query.maxPrice) {
      where.price = { ...where.price, lte: parseFloat(req.query.maxPrice) };
    }

    if (req.query.search) {
      where.OR = [
        { name: { contains: req.query.search, mode: "insensitive" } },
        { distillery: { contains: req.query.search, mode: "insensitive" } },
      ];
    }

    const ALLOWED_SORT_ORDER = ["asc", "desc"];
    const ALLOWED_SORT_BY = ["price", "age"];

    if (req.query.sortBy) {
      if (
        !ALLOWED_SORT_BY.includes(req.query.sortBy) ||
        (req.query.sortOrder &&
          !ALLOWED_SORT_ORDER.includes(req.query.sortOrder))
      ) {
        return next(new CustomError("Invalid sort params", 400));
      }
    }

    const orderBy = req.query.sortBy
      ? [
          {
            [req.query.sortBy]: req.query.sortOrder === "desc" ? "desc" : "asc",
          },
        ]
      : undefined;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const products = prisma.product.findMany({
      where,
      orderBy,
      skip,
      take: limit,
    });

    const count = prisma.product.count({ where });

    const [productsResult, countResult] = await Promise.all([products, count]);

    const response = {
      data: productsResult,
      total: countResult,
      page,
      limit,
      totalPages: Math.ceil(countResult / limit),
    };

    res.json(response);
  } catch (err) {
    logger.warn("Get products failed", {
      ip: req.ip,
    });
    return next(new CustomError("Get products failed", 500));
  }
};

exports.getFilters = (req, res) => {
  const regions = [...new Set(products.map((p) => p.region))];
  const types = [...new Set(products.map((p) => p.type))];
  const countries = [...new Set(products.map((p) => p.country))];
  const ratings = [...new Set(products.map((p) => p.rating))];

  const products = productsData;
  const minPrice = Math.min(...products.map((p) => p.price));
  const maxPrice = Math.max(...products.map((p) => p.price));
  const priceRange = { min: minPrice, max: maxPrice };

  const response = { regions, types, countries, priceRange, ratings };

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

exports.createProduct = (req, res, next) => {
  const newProductData = req.body;
  const { error, value } = productSchema.validate(newProductData);

  if (error) {
    return next(new CustomError("Invalid fields", 400));
  }

  const newProduct = {
    id: Math.max(...productsData.map((p) => p.id)) + 1, // Simple way to generate an ID
    ...req.body,
  };
  productsData.push(newProduct);
  res.status(201).json(newProduct);
};

exports.putProduct = (req, res, next) => {
  const productId = parseInt(req.params.id);
  const newProductData = req.body;
  const { error, value } = productSchema.validate(newProductData);

  if (error) {
    return next(new CustomError("Invalid fields", 400));
  }

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
