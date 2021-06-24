const router = require('express').Router();

const { isGuest } = require('../middlewares/authMiddleware');
const { register, login, logout } = require("../controllers/authController");

router.post('/register', isGuest(), register);
router.post('/login', isGuest(), login);
router.get('/logout', logout);

module.exports = router;