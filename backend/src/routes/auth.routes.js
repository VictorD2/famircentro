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
        failureRedirect: '/failedLogin',
    })(req, res, next);
});


router.get('/sucessfulLogin', typePetition, async(req, res) => {
    if (!req.user) return res.json({ error: "Contraseña o Correo inválidos" }); //No autentificado
    delete req.user.Contrasenia;
    req.user.authenticate = true;
    return res.json({ success: "Sesión Iniciada", user: req.user });
});

router.get('/failedLogin', typePetition, async(req, res) => {
   return res.json({ error: "Contraseña o Correo inválidos" }); //No autentificado
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
    res.json({success:"Desconectado"});
});

module.exports = router;