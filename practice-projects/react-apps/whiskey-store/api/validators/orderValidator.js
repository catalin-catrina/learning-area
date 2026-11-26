const Joi = require("joi");
const { addressFields } = require("./addressValidator");

// Checkout takes exactly one of:
// - addressId: one of the user's saved addresses
// - shippingAddress: a one-off address typed at checkout, plus saveAddress
//   to also keep it in the user's address book
const schema = Joi.object({
  addressId: Joi.number().integer().positive(),
  shippingAddress: addressFields,
  saveAddress: Joi.boolean(), // no default: it must stay absent when addressId is used
  makeDefault: Joi.boolean(), // only meaningful together with saveAddress
})
  .xor("addressId", "shippingAddress")
  .without("addressId", ["saveAddress", "makeDefault"]);

module.exports = schema;
