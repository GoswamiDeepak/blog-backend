import { config } from '../app-config/config.js';
import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateAccessAndRefreshTokens } from '../utils/generateAccess&RefreshToken.js';
import sendmail from '../utils/mailer.js';
import { User } from './user.model.js';
import jwt from 'jsonwebtoken';

const registerUser = asyncHandler(async (req, res) => {
    //TODOS: check validation
    try {
        const { name, email, password, usertype } = req.body;
        if ([name, email, password].some((field) => field?.trim() === '')) {
            throw new ApiError(400, 'All Fields are required!');
        }
        const isExit = await User.findOne({ email });
        if (isExit) {
            throw new ApiError(401, 'User already exist!');
        }
        const user = await User.create({
            name,
            email,
            password,
            userType: usertype && usertype,
        });
        if (!user) {
            throw new ApiError(500, 'Registration Failed !!!');
        }
        //Send email to user************
        const mailResponse = await sendmail(user.email, 'VERIFY', user._id);

        return res
            .status(201)
            .json(new ApiResponse(201, user, 'user registration successfull'));
    } catch (error) {
        console.log(error);
        throw new ApiError(
            error.statusCode || 500,
            error.message || 'Internal Server Issue'
        );
    }
});

const loginUser = asyncHandler(async (req, res) => {
    try {
        //[-]validation user data
        //[+] Find user data from collection
        //[+] if user is not exist throw error
        //[+] if user is not varified throw error with again mail
        //[+] if user is exist then compare password
        //[+] if password is not match throw error
        //[+] if password is match then generate access and refresh token
        //[+] send access and refresh token to user

        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            throw new ApiError(400, 'User not found!');
        }
        if (!user.isVerified) {
            const mailResponse = await sendmail(user.email, 'VERIFY', user._id);
            throw new ApiError(400, 'Please verify your account!');
        }

        const validPassword = await user.isPasswordCompare(password);

        if (!validPassword) {
            throw new ApiError(401, 'Invalid password!');
        }

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshTokens(user._id);
        console.log(accessToken);
        console.log(refreshToken);
        const userModified = await User.findById(user._id, {
            name: 1,
            email: 1,
            userType: 1,
        });
        res.status(200).json(
            new ApiResponse(
                200,
                {
                    data: userModified,
                    accessToken,
                    refreshToken,
                },
                'Login SuccessFully !!!'
            )
        );
    } catch (error) {
        console.log(error);
        throw new ApiError(
            error.statusCode || 500,
            error.message || 'Internal Server Issue'
        );
    }
});

const verifyUser = asyncHandler(async (req, res) => {
    //[+] take verify token from user from body
    //[+] verify token from document check verifyToekn and expiry time must be greater then current time
    //[+] update document do true to user verified and remove verify token and expiry time
    //[+] send response

    try {
        const verifytoken = req.body.verifyToken;
        if (!verifytoken) {
            throw new ApiError(400, 'Send Verification Token');
        }
        const user = await User.findOne({
            verifiyToken: verifytoken,
            verifyTokenExpiry: { $gt: Date.now() },
        });
        if (!user) {
            throw new ApiError(403, 'Token has been expired or Invalid!');
        }
        user.isVerified = true;
        user.verifiyToken = undefined;
        user.verifyTokenExpiry = undefined;
        user.save();

        res.status(200).json(
            new ApiResponse(200, 'Email verified successfully !!')
        );
    } catch (error) {
        throw new ApiError(
            error.statusCode || 500,
            error.message || 'Internal server error'
        );
    }
});

const forgetPassword = asyncHandler(async (req, res) => {
    //[+] take email from user's body
    //[+] verify email from document that user is exist
    //[+] call sendMail function and pass email, emailType=RESET and userId, send mail
    //[+] send response to cliend that email send to client to click
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            throw new ApiError(400, 'User not found !');
        }
        const mailResponse = await sendmail(email, 'RESET', user._id);
        if (!mailResponse) {
            throw new ApiError(
                500,
                'Cound not send Reset-Email due to internal issue !!!'
            );
        }
        res.status(200).json(
            new ApiResponse(200, 'Reset password link send to your email.!!!')
        );
    } catch (error) {
        console.log(error);
        throw new ApiError(
            error.statusCode || 500,
            error.message || 'Internal server Error'
        );
    }
});

const verifyResetToken = asyncHandler(async (req, res) => {
    try {
        const { forgotPasswordToken, newPassword } = req.body;
        if (!forgotPasswordToken) {
            throw new ApiError(400, 'Forget password token is required !');
        }
        const user = await User.findOne({
            forgotPasswordToken,
            forgotPasswordTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            throw new ApiError(
                401,
                'Forget password token has been expired or Invalid'
            );
        }

        user.forgotPasswordToken = undefined;
        user.forgotPasswordTokenExpiry = undefined;
        user.password = newPassword;
        user.save();

        res.status(200).json(
            new ApiResponse(200, 'Forget-password token has been verifed')
        );
    } catch (error) {
        console.log(error);
        throw new ApiError(
            error.statusCode || 500,
            error.message || 'Internal server issue !!!'
        );
    }
});

const refreshTokenGenerate = asyncHandler(async (req, res) => {
    //[+] get refresh token from user by body
    //[+] verify token by jwt verify
    //[+] find user by decoded._id
    //[+] if user not found throw error
    //[+] if user refresh token not match throw error
    //[+] generate new access and refresh token
    //[+] save new refresh token to user
    //[+] send response
 
    try {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) {
            throw new ApiError(401, 'Require refreshToken !'); 
        }

        const decodedRefreshToken = jwt.verify(refreshToken, config.refresh);
        if (!decodedRefreshToken) {
            throw new ApiError(401, 'RefreshToken is not valid!');
        }
        const user = await User.findById(decodedRefreshToken._id);
        if (!user) {
            throw new ApiError(404, 'User Not found');
        }
        if (user.refreshToken !== refreshToken) {
            throw new ApiError(409, 'Invalid refresh token send !');
        }
        const { accessToken, refreshToken: newRefreshToken } =
            await generateAccessAndRefreshTokens(user._id);

        res.status(200).json(
            new ApiResponse(200, { accessToken, refreshToken: newRefreshToken })
        );
    } catch (error) {
        console.log(error);
        throw new ApiError(
            error.statusCode || 500,
            error.message || 'Internal Server Issue'
        );
    }
});

export {
    registerUser,
    loginUser,
    refreshTokenGenerate,
    verifyUser,
    forgetPassword,
    verifyResetToken,
};
