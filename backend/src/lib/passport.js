const pool = require('../database');
const helpers = require('./helpers');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE  Correo = ?', [email]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.Password);
        if (validPassword) {
            done(null, user, req.flash('success', 'Bienvenido ' + user.Nombre));
        } else {
            done(null, false, req.flash('failure', 'Contraseña incorrecta'));
        }
    } else {
        return done(null, false, req.flash('failure', 'El usuario no existe'));

    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, user, pass, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE  Correo = ?', [user]);
    if (rows.length > 0) return done(null, false); //Por si existe un correo ya
    const { name, surname, email, password } = req.body;
    const newUser = {
        Nombres: name,
        Apellidos: surname,
        Rango: "user",
        Correo: email,
        Contrasenia: password
    }
    newUser.Contrasenia = await helpers.encrypPassword(newUser.Contrasenia); //<- Encripta la contraseña
    await pool.query('INSERT INTO usuarios set ?', [newUser]);
    return done(null, user);
}));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async(id, done) => {
    const rows = await pool.query('SELECT * FROM usuarios Where Correo = ?', [id]);
    done(null, rows[0]);
});