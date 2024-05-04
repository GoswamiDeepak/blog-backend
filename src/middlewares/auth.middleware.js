import { config } from '../app-config/config.js';
import { ApiError } from '../utils/apiError';
import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    //[-] check accessToken form req.cookies.accessToken
    //[-] check accessToken from req.headers.authorization
    //[-] check accessToekn from req.header('Authorization')
    //[-] verify accessToken using jwt.verify as well as secret token
    //[-] add user details in req

    try {
        const token =
            req.cookies.accessToken ||
            req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new ApiError(401, 'Invalid Token !!!');
        }
        const decoded = jwt.verify(token, config.secret);
        req.user = decoded;
        next();
    } catch (error) {
        throw new ApiError(401, 'Unauthorized request !!!');
    }
};
