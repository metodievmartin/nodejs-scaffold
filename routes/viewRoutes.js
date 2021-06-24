const router = require('express').Router();

const { isGuest } = require('../middlewares/authMiddleware');
const { homePage, registerPage, loginPage } = require('../controllers/viewsController');

router.get('/', homePage);
router.get('/register', isGuest(), registerPage);
router.get('/login', isGuest(), loginPage);

module.exports = router;