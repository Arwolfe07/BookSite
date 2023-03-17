const User = require('../models/user');

module.exports.registerForm = (req, res) => {
    res.render('users/register');
}

module.exports.registered = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => { // fix the  registered route i.e. not login again after regitering for first time
            if (err) return next(err);
            req.flash('success', 'Welcome to WolfeChemE!')
            res.redirect('/books');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}

module.exports.loginForm = (req, res) => {
    res.render('users/login');
}

module.exports.loginUser = (req, res) => {
    req.flash('success', 'Welcome  Back!');
    res.redirect('/books');
}

module.exports.logoutUser = (req, res) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Logged out!');
        res.redirect('/books');
    });
}