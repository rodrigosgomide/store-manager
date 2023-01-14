const Joi = require('joi');

const productScheema = Joi.object({
  name: Joi.string().min(5).required(),
});

module.exports = {
  productScheema,
};