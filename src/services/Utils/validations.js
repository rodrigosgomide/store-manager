const { errorStatus } = require('./errors');

const errorHandler = (message, status) => ({ message, status });

const validateByScheema = (scheema, value) => {
  const { error } = scheema.validate(value);
  if (error) {
    const { type } = error.details[0];
    if (type === 'any.required') {
      throw errorHandler(error.message, errorStatus.IS_REQUIRED);
    }
    throw errorHandler(error.message, errorStatus.INVALID_VALUE);
  }
};

const validateById = async (model, id, errorMessage) => {
  const result = await model.findById(id);

  if (!result || result.length === 0) throw errorHandler(errorMessage, errorStatus.NOT_FOUND);
  return result;
};

module.exports = {
  validateByScheema,
  errorHandler,
  validateById,
};