const { isEmail, isAlphanumeric, isURL } = require('validator');

exports.registerInputValidator = (email, username, password, rePass) => {
    const errors = [];

    email = email.trim();
    username = username.trim();
    password = password.trim();
    rePass = rePass.trim();

    if (email === '' || username === '' || password === '' || rePass === '') {
        errors.push('All fields are required');
    }

    if (!isEmail(email)) {
        errors.push('Please enter a valid email');
    }

    if (username.length < 3) {
        errors.push('Username must be at least 3 characters long');
    }

    if (!isAlphanumeric(username)) {
        errors.push('Username must consist only of latin letters and digits');
    }

    if (password.length < 5) {
        errors.push('Password must be at least 5 characters long');
    }

    if (password !== rePass) {
        errors.push('Passwords don\'t match');
    }

    return errors;
};

exports.loginInputValidator = (username, password,) => {
    const errors = [];

    username = username.trim();
    password = password.trim();

    if (username === '' || password === '') {
        errors.push('All fields are required');
    }

    if (password.length < 5) {
        errors.push('Password must be at least 5 characters long');
    }

    return errors;
};

exports.hotelInputValidator = (name, city, freeRooms, imageUrl) => {
    const errors = [];

    name = name.trim();
    city = city.trim();
    freeRooms = freeRooms.trim();
    imageUrl = imageUrl.trim();

    if (name === '' || city === '' || freeRooms === '' || imageUrl === '') {
        errors.push('All fields are required');
    }

    if (name.length < 4) {
        errors.push('Hotel name must be at least 4 characters long');
    }

    if (city.length < 3) {
        errors.push('City must be at least 3 characters long');
    }

    freeRooms = Number(freeRooms);
    if (isNaN(freeRooms) || freeRooms < 1 || freeRooms > 100) {
        errors.push('Free rooms must be a number between 1 and 100 inclusively')
    }

    if (!isURL(imageUrl)) {
        errors.push('The Image must be a valid URL')
    }

    return errors;
};