const router = require('express').Router();
const passport = require('passport');
const pool = require('../database');
const { isAdmin, typePetition } = require('../lib/auth');

//Registrarse
router.post('/signup', async(req, res, next) => {
    passport.authenticate('local.signup', {
        successRedirect: '/sucessfulLogin',
        failureRedirect: '/sucessfulLogin'
    })(req, res, next);
});

//Iniciar Session
router.post('/signin', (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/sucessfulLogin',
        failureRedirect: '/sucessfulLogin',
    })(req, res, next);
});


router.get('/sucessfulLogin', typePetition, async(req, res) => {
    if (req.user) {
        const rows = await pool.query('SELECT * FROM usuarios WHERE Correo = ?', [req.user.Correo]);
        return res.json({ user: rows[0], authenticate: true });
    }
    return res.json({ message: "failed", authenticate: false }); //No autentificado
});

// Iniciar con Facebook
router.get("/auth/facebook", passport.authenticate("facebook", { scope: ['email'] }));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
    successRedirect: '/',
    failureRedirect: '/Login'
}));

//Iniciar con Google
router.get('/auth/google', passport.authenticate('google', {
    scope: ['email', 'profile']
}));
router.get('/auth/google/callback', passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/Login'
}));


//Desconectarse
router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/');
});

module.exports = router;