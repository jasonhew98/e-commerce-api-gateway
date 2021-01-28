function errorHandlerMiddleware(error, req, res, next) {
    if (res.headersSent) {
        return next(error);
    }

    const container = req.container;
    const logger = container.resolve("logger");

    if (error.response) {
        logger.error("An error has occured while trying to process remote request.", error.response);
        const message = error.response.data.message || error.message;
        res.status(502).send({ message });
    }
    else {
        logger.error("An unknown error has occured. \n", error.stack);
        res.status(400).send({ message: error.message });
    }
};

module.exports = errorHandlerMiddleware;