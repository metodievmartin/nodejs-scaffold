exports.registerPage = (req, res) => {
    res.render('register');
};

exports.loginPage = (req, res) => {
    res.render('login');
};

exports.homePage = (req, res) => {
    // TODO - fetch data from DB
    res.render('homepage', {title: 'Home page'});
};