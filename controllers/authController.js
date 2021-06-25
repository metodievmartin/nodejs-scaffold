const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userService = require("../services/userServices");
const MultiMsgError = require("../utils/MultiMsgError");
const { registerInputValidator, loginInputValidator } = require("../utils/inputValidators");
const { TOKEN_SECRET } = require("../config");
const { COOKIE_NAME } = require("../config");


exports.register = async (req, res) => {
    try {
        const { username, password, rePass } = req.body;

        // TODO - fix the validator accordingly
        // Performs all the validations and returns an array of error messages if any
        const errors = registerInputValidator(username, password, rePass);

        if (errors.length > 0) {
            // Custom error that accepts an array of error messages
            throw new MultiMsgError(errors);
        }

        const token = await registerUser(req.body.username, req.body.password);
        res.cookie(COOKIE_NAME, token);

        res.redirect('/');
    } catch (err) {
        const ctx = {
            title: 'Register page',
            errors: err.errorMsgArray || [err.message],
            userData: {
                email: req.body.email,
                username: req.body.username
            }
        }
        res.render('register', ctx);
    }
};

exports.login = async (req, res) => {
    try {

        const { username, password } = req.body;

        // Performs all the validations and returns an array of error messages if any
        const errors = loginInputValidator(username, password);

        if (errors.length > 0) {
            // Custom error that accepts an array of error messages
            throw new MultiMsgError(errors);
        }

        const token = await loginUser(req.body.username, req.body.password);
        res.cookie(COOKIE_NAME, token);

        res.redirect('/');
    } catch (err) {
        const ctx = {
            title: 'Login page',
            errors: err.errorMsgArray || [err.message],
            userData: {
                username: req.body.username
            }
        }
        res.render('login', ctx);
    }
};

const loginUser = async (username, password) => {
    const user = await userService.getUserByUsername(username);

    if (!user) {
        console.error('>>> Login Error: Such user doesn\'t exist:', username);

        throw new Error('Wrong username and/or password');
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!hasMatch) {
        console.error('>>> Login Error: Wrong password!');

        throw new Error('Wrong username and/or password');
    }

    return generateToken(user);
};

const registerUser = async (username, password) => {
    // TODO - adapt parameters to project requirements
    // TODO - extra validation

    const existing = await userService.getUserByUsername(username);

    if (existing) {
        throw new Error('Username is taken!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userService.createUser(username, hashedPassword);

    return generateToken(user);
};

const generateToken = (user) => {
    const payload = {
        _id: user._id,
        username: user.username
    };

    return jwt.sign(payload, TOKEN_SECRET);
};

exports.logout = (req, res) => {
    res.clearCookie(COOKIE_NAME);
    res.redirect('/');
};
