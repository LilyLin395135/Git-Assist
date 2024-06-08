class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
};

function errorHandler(err, req, res, next) {
    console.error(err.stack);
    if (err instanceof ValidationError) {
        res.status(400).json({ errors: err.errors });
    } else {
        res.status(500).json({ error: err.message || 'Internal Server Error' });
    }
}

export { ValidationError, errorHandler };