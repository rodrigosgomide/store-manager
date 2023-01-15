const Joi = require('joi');

const productScheema = Joi.object({
  name: Joi.string().min(5).required(),
  id: Joi.number(),
});

const saleScheema = Joi.object({
  productId: Joi.required(),
  quantity: Joi.number().min(1).required(),
});

module.exports = {
  productScheema,
  saleScheema,
};