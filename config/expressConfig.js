const express = require('express');
const cookieParser = require('cookie-parser');

const userValidator = require('../middlewares/userValidator');
const devLogger = require('../middlewares/devLogger');

module.exports = (app) => {
    // Set the view engine
    app.set('view engine', 'pug');
    // Set the path to views folder
    app.set('views', 'views');

    app.use('/static', express.static('static'));
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());

    // Decorates the req obj with an 'user' property if there's a valid token and clears the cookie if not
    app.use(userValidator());

    app.use(devLogger());


    // TODO - add storage middlewares
};