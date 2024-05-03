import { generateAccessAndRefreshTokens } from '../utils/generateAccess&RefreshToken.js';
import sendmail from '../utils/mailer.js';
import { User } from './user.model.js';

const registerUser = async (req, res) => {
    //TODOS: check validation
    const { name, email, password, usertype } = req.body;
    const isExit = await User.findOne({ email });
    if (isExit) {
        return res.status(400).json({
            message: 'User exist!',
        });
    }
    const user = await User.create({
        name,
        email,
        password,
        userType: usertype && usertype,
    });
    // await sendmail(user.email, 'verify', `welcome ${user.name}`);
    return res.status(201).json({
        data: user,
        message: 'user created!',
    });
};

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
