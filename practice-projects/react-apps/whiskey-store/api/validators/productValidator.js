const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  price: Joi.number().min(0).required(),
  type: Joi.valid(
    "single_malt",
    "blended_scotch",
    "blended_malt",
    "bourbon",
    "rye",
    "irish",
    "japanese",
  ).required(),
  inStock: Joi.boolean().required(),
  distillery: Joi.string().min(3).max(30),
  region: Joi.string().min(3).max(30),
  country: Joi.string().min(3).max(30),
  age: Joi.number().min(0),
  abv: Joi.number().min(0),
  description: Joi.string().min(5).max(500),
  rating: Joi.number().min(0).max(5),
});

module.exports = schema;
