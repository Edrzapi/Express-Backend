const NODE_ENVIRONMENT = process.env.NODE_ENV || "development";

const errorHandler = (error, request, response, next) => {
  // Get error message
  const errorMessage = getErrorMessage(error);
  
  // Log error message
  logErrorMessage(errorMessage);

  // Check if headers have already been sent
  if (response.headersSent) {
    return next(error);
  }

  // Determine HTTP status code
  const statusCode = getHttpStatusCode({ error, response });

  // Construct error response
  const errorResponse = {
    statusCode,
    message: errorMessage
  };

  // In non-production environments, include error message in response body
  if (NODE_ENVIRONMENT !== "production") {
    errorResponse.body = errorMessage;
  }

  // Set HTTP status code
  response.status(errorResponse.statusCode);

  // Format response based on content type
  response.format({
    "application/json": () => {
      response.json({ message: errorResponse.message });
    },
    default: () => {
      response.type("text/plain").send(errorResponse.message);
    }
  });

  next();
};

module.exports = { errorHandler };
