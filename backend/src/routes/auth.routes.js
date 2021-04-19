const router = require('express').Router();
const helpers = require('../lib/helpers');
const passport = require('passport');

router.post('/signup', async(req, res,next) => {
    passport.authenticate('local.signup', {
        successRedirect: '/succesful',
        // JSON.stringify({message:"Very gud nais"})
        failureRedirect: '/Register',
        failureFlash: true
    })(req, res, next);
});



module.exports = router;