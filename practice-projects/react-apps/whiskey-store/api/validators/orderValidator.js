const Joi = require("joi");

const schema = Joi.object({
  shippingAddress: Joi.object({
    name: Joi.string().trim().min(1).max(100).required(),
    line1: Joi.string().trim().min(1).max(200).required(),
    line2: Joi.string().trim().max(200),
    city: Joi.string().trim().min(1).max(100).required(),
    postalCode: Joi.string().trim().min(1).max(20).required(),
    country: Joi.string().trim().min(1).max(100).required(),
  }).required(),
});

module.exports = schema;
