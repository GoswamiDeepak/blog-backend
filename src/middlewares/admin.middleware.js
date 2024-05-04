import { ApiError } from '../utils/apiError';

export const isAdmin = (req, res, next) => {
    if (req.user.userType === 'ADMIN') {
        next();
    } else {
        throw new ApiError(401, 'Only Admin can access !');
    }
};
