import { User } from './user.model.js';

const createUser = async (req, res) => {
    const { name, email, password } = req.body;
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
    });
    
    return res.status(201).json({
        data: user,
        message: 'user created!',
    });
};

export { createUser };
