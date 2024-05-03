class ApiError extends Error {
    constructor(
        statusCode = 500,
        message = 'Internal server Error !',
        errors = [],
        stack = ''
    ) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.success = false;
        this.error = errors;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };
