const User = require('../models/User');

const createUser = async (username, hashedPassword) => {
    // TODO - adapt properties to project requirements

    const user = new User({
        username,
        hashedPassword
    });

    await user.save();

    return user;
};

const getUserByUsername = async (username) => {
    const pattern = new RegExp(`^${username}$`, 'i');
    const user = await User.findOne({ username: { $regex: pattern } });

    return user;
};

module.exports = {
    createUser,
    getUserByUsername
}