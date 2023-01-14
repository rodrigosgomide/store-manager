const errorStatus = {
  IS_REQUIRED: 400,
  INVALID_VALUE: 422,
  NOT_FOUND: 404,
};

const errorMessages = {
  PRODUCT_NOT_FOUND: 'Product not found',
};
  
const errorHandler = (message, status) => ({ message, status });

module.exports = {
  errorStatus,
  errorMessages,
  errorHandler,
};