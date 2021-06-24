module.exports = () => {
    return (req, res, next) => {
        if (!req.url.includes('favicon') && !req.url.includes('css')) {
            console.log(`>>> Method: ${req.method}`);
            console.log(`>>> URL: ${req.url}`);

            if (req.user) {
                console.log('>>> Known user - ', req.user.username);
            } else {
                console.log('>>> No logged user');
            }
        }

        next();
    };
};