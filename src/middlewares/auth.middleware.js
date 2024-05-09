import { config } from '../app-config/config.js';
import { ApiError } from '../utils/apiError.js';
import jwt from 'jsonwebtoken';
import { asyncHandler } from '../utils/asyncHandler.js';

export const auth = asyncHandler((req, res, next) => {
    //[-] check accessToken form req.cookies.accessToken
    //[-] check accessToken from req.headers.authorization
    //[-] check accessToekn from req.header('Authorization')
    //[-] verify accessToken using jwt.verify as well as secret token
    //[-] add user details in req

    try {
        const token =
            req?.cookies?.accessToken ||
            req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new ApiError(400, 'Access Token required !!!');  
        }
        const decoded = jwt.verify(token, config.secret); 
        if (!decoded) {
            throw new ApiError(401, 'Access Token has been expired !!!');
        }
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        throw new ApiError(error.statusCode || 401 , error.message);
    }
});
