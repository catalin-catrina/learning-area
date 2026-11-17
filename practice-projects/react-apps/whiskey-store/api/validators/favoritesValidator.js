const Joi = require("joi");

const schema = Joi.object({
  productId: Joi.number().integer().positive().required(),
});

module.exports = schema;