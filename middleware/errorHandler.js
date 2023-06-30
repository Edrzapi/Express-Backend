const NODE_ENVIRONMENT = process.env.NODE_ENV || "development";

const errorHandler = (error, request, response, next) => {
	const errorMessage = getErrorMessage(error);
		logErrorMessage(errorMessage);
		
	if (response.headersSent) {
		return next(error);
	}

	const errorResponse = {
		statusCode: getHttpStatusCode({ error, response }),
		body: response
	};


	if (NODE_ENVIRONMENT !== "production") {
		errorResponse.body = errorMessage;
	}
	const resCheck = response.status(errorResponse.statusCode);
	
	response.format({
		"application/json": () => {
			response.json({ message: `${errorResponse.body}` });
		},

		default: () => {
			response.type("text/plain").send(`${errorResponse.body}`);
		},
	});
	next();
}

module.exports = { errorHandler };