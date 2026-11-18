const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  password: Joi.string().min(3),
  phone: Joi.string().pattern(/^\d{3}-\d{3}-\d{4}$/),
});

module.exports = schema;
