import { ApiError } from '../utils/apiError.js';
import { ApiResponse } from '../utils/apiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { generateAccessAndRefreshTokens } from '../utils/generateAccess&RefreshToken.js';
import sendmail from '../utils/mailer.js';
import { User } from './user.model.js';

const registerUser = asyncHandler(async (req, res) => {
    //TODOS: check validation
    try {
        const { name, email, password, usertype } = req.body;
        if ([name, email, password].some((field) => field?.trim() === '')) {
            throw new ApiError(400, 'All Fields are required!');
        }
        const isExit = await User.findOne({ email });
        if (isExit) {
            throw new ApiError(400, 'User already exist!');
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

const loginUser = async (req, res) => {
    //validation
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        res.status(400).json({
            message: 'User not found!',
        });
    }

    const validPassword = await user.isPasswordCompare(password);

    if (!validPassword) {
        res.status(400).json({
            message: 'Invalid password!',
        });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user_id
    );

    res.status(200).json({
        data: user,
        accessToken,
        refreshToken,
    });
};

export { registerUser, loginUser };
