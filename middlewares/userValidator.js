const jwt = require("jsonwebtoken");
const { COOKIE_NAME, TOKEN_SECRET } = require("../config");

module.exports = () => {
    return (req, res, next) => {
        const token = req.cookies[COOKIE_NAME];

        if (token) {
            try {
                const user = jwt.verify(token, TOKEN_SECRET);

                req.user = user
                res.locals.user = user;

            } catch (err) {
                res.clearCookie(COOKIE_NAME);

            }
        }

        next();
    };
};