const Joi = require("joi");

const STYLES = [
  "single_malt",
  "blended_malt",
  "blended",
  "single_grain",
  "single_pot_still",
  "bourbon",
  "rye",
];

// Body for admin create/replace. rating/reviewCount are derived from reviews,
// so they are deliberately not accepted here.
const productSchema = Joi.object({
  slug: Joi.string()
    .pattern(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .max(140)
    .required(),
  name: Joi.string().trim().min(2).max(120).required(),
  brand: Joi.string().trim().min(2).max(60).required(),
  style: Joi.string()
    .valid(...STYLES)
    .required(),
  country: Joi.string().trim().min(2).max(60).required(),
  region: Joi.string().trim().min(2).max(60).allow(null),
  ageYears: Joi.number().integer().min(0).max(100).allow(null),
  abv: Joi.number().min(0).max(100).required(),
  volumeMl: Joi.number().integer().positive().max(10000).required(),
  priceCents: Joi.number().integer().min(0).required(),
  compareAtPriceCents: Joi.number()
    .integer()
    .greater(Joi.ref("priceCents"))
    .allow(null),
  peated: Joi.boolean().default(false),
  giftBox: Joi.boolean().default(false),
  inStock: Joi.boolean().default(true),
  cask: Joi.string().trim().max(120).allow(null),
  tastingNotes: Joi.array()
    .items(Joi.string().trim().max(40))
    .max(8)
    .default([]),
  description: Joi.string().trim().min(10).max(1000).required(),
  imageUrl: Joi.string().uri({ allowRelative: true }).max(500).allow(null),
});

module.exports = productSchema;
module.exports.STYLES = STYLES;
