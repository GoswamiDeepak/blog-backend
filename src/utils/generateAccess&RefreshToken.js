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
        const refrshToken = await user.generateRefreshToken();
        user.refreshToken = refrshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refrshToken };
    } catch (error) {
        console.log(error);
    }
};
