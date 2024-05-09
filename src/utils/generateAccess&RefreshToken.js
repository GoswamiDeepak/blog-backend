import { User } from '../user/user.model.js';

export const generateAccessAndRefreshTokens = async (id) => {
    //[+] Find user by id9
    //[+] generate accessToken
    //[+] generate refreshToken
    //[+] save refresh_token in db
    //[+] return {accessToken, refresh_token}

    try {
        const user = await User.findById(id);
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken };
    } catch (error) {
        console.log(error);
    }
};
