const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

const {isGuest} = require("../middlewares/authMiddleware");
const catchAsync = require('../utils/catchAsync');
const userService = require("../services/userServices");
const {TOKEN_SECRET} = require("../config");
const {COOKIE_NAME} = require("../config");


exports.register = async (req, res) => {
    try {
        // TODO - input validations

        const token = await registerUser(req.body.username, req.body.password);
        res.cookie(COOKIE_NAME, token);

        res.redirect('/');
    } catch (err) {
        console.log(err);
        const ctx = {
            errors: [err.message],
            userData: {
                username: req.body.username
            }
        }
    }
};

exports.login = async (req, res) => {
    try {
        const token = await loginUser(req.body.username, req.body.password);
        res.cookie(COOKIE_NAME, token);

        res.redirect('/');
    } catch (err) {
        console.log(err);
        const ctx = {
            title: 'Login page',
            errors: [err.message],
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
        throw new Error('No such user!');
    }

    const hasMatch = await bcrypt.compare(password, user.hashedPassword);

    if (!hasMatch) {
        throw new Error('Wrong password!');
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
