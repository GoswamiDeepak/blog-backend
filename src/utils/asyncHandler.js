export const asyncHandler = (fn) => async (req, res, next) => {
    try {
        await fn(req, res, next);
    } catch (error) {
        //****************** handle error of application */
        res.status(error.statusCode || 500).json({
            errorCode: error.statusCode,
            success: false,
            message: error.message,
        });
    }
};
