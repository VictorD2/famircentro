const router = require('express').Router();
const helpers = require('../lib/helpers');
const passport = require('passport');


router.post('/signup', async(req, res, next) => {
    passport.authenticate('local.signup', {
        successRedirect: '/succesfulRegister',
        failureRedirect: '/Register',
        failureFlash: true
    })(req, res, next);
});
router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/succesfulLogin',
        failureRedirect: '/Login',
        failureFlash: true
    })(req, res, next);
});
// app.get('/auth/instagram/callback', 
//   passport.authenticate('instagram', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/succesfulRegister');
//   });
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;