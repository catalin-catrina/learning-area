const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  password: Joi.string().min(3),
  // international format: digits, spaces, dashes, brackets, optional leading +
  phone: Joi.string().trim().pattern(/^\+?[\d\s().-]{7,20}$/),
});

module.exports = schema;
