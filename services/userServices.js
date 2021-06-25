const User = require('../models/User');

exports.createUser = async (username, hashedPassword) => {
    // TODO - adapt properties to project requirements

    const user = new User({
        username,
        hashedPassword
    });

    await user.save();

    return user;
};

exports.getUserByUsername = async (username) => {
    const pattern = new RegExp(`^${username}$`, 'i');
    return User.findOne({ username: { $regex: pattern } });
};

exports.getUserById = async (id) => {
    return User.findById(id);
};

exports.addPlayToLikes = async (userId, playId) => {
    return User.findByIdAndUpdate(userId, { $push: { likedPlays: playId } });
};