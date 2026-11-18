const Joi = require("joi");
const { STYLES } = require("./productValidator");

const SORTS = [
  "name_asc",
  "name_desc",
  "price_asc",
  "price_desc",
  "age_desc",
  "rating_desc",
  "newest",
];

// Multi-select params arrive as `?style=a&style=b` (array) or `?style=a` (string).
// `.single()` accepts the string form and wraps it in an array, so the controller
// always sees an array.
const many = (item) => Joi.array().items(item).single();

const productQuerySchema = Joi.object({
  search: Joi.string().trim().max(100).allow(""),
  style: many(Joi.string().valid(...STYLES)),
  brand: many(Joi.string().max(60)),
  country: many(Joi.string().max(60)),
  region: many(Joi.string().max(60)),
  age: many(Joi.number().integer().min(0).max(100)),
  volume: many(Joi.number().integer().positive()),
  peated: Joi.boolean(),
  giftBox: Joi.boolean(),
  inStock: Joi.boolean(),
  onSale: Joi.boolean(),
  minPrice: Joi.number().min(0), // euros, as the user sees them
  maxPrice: Joi.number().min(0),
  sort: Joi.string()
    .valid(...SORTS)
    .default("name_asc"),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(48).default(24),
});

module.exports = productQuerySchema;
module.exports.SORTS = SORTS;
