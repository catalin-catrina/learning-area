const Joi = require("joi");

// The address fields on their own. Reused by the order validator, so a saved
// address and a one-off checkout address follow exactly the same rules.
const addressFields = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
  line1: Joi.string().trim().min(1).max(200).required(),
  line2: Joi.string().trim().max(200).allow("", null),
  city: Joi.string().trim().min(1).max(100).required(),
  postalCode: Joi.string().trim().min(1).max(20).required(),
  country: Joi.string().trim().min(1).max(100).required(),
});

// POST /api/addresses: the fields + optionally "make this my default"
const createAddressSchema = addressFields.keys({
  isDefault: Joi.boolean().default(false),
});

// PUT /api/addresses/:id: fields only. The default is changed through
// PATCH /:id/default, so there's exactly one way to move it.
const updateAddressSchema = addressFields;

module.exports = { addressFields, createAddressSchema, updateAddressSchema };
