const Joi = require("joi");

// Body for PUT /products/:id/reviews/me (create or edit your review).
exports.reviewSchema = Joi.object({
  rating: Joi.number().integer().min(1).max(5).required(),
  comment: Joi.string().trim().max(2000).allow("", null),
});

exports.reviewListSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(5),
});
