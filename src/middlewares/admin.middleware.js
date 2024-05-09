import { ApiError } from '../utils/apiError.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const isAdmin = asyncHandler(async (req, res, next) => {
    if (req.user.userType === 'ADMIN') {
        next();
    } else {
        throw new ApiError(401, 'Only Admin can access !');
    }
});
