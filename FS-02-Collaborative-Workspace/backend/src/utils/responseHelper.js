const buildSuccessResponse = (message, data = null) => ({
  success: true,
  message,
  data,
  timestamp: new Date().toISOString(),
});

const buildErrorResponse = (message, error = null, statusCode = 500) => ({
  success: false,
  message,
  statusCode,
  error: error && typeof error === 'object' ? error.message || String(error) : error,
  timestamp: new Date().toISOString(),
});

module.exports = {
  buildSuccessResponse,
  buildErrorResponse,
};
