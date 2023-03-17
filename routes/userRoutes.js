const express = require('express');
const passport = require('passport');
const router = express.Router();

const users = require('../controllers/users');
const catchAsync = require('../utils/catchAsync');


router.route('/register')
    .get(users.registerForm)
    .post(catchAsync(users.registered))

router.route('/login')
    .get(users.loginForm)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.loginUser)

router.get('/logout', users.logoutUser)

module.exports = router;
