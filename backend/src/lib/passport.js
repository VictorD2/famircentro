const pool = require('../database');
const helpers = require('./helpers');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const llaves = require('../config');

//Configuración de passport al iniciar sesion
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {

    const rows = await pool.query('SELECT * FROM usuario WHERE  correo = ?', [email]); //<- Buscamos al usuario
    if (!rows.length > 0) return done(null, false); //El usuario no existe

    const validPassword = await helpers.matchPassword(password, rows[0].password); //<- Verificando la contraseña

    if (validPassword) return done(null, rows[0]); //<- Contraseña correcta

    done(null, false); //<-Contraseña incorrecta

}));

//Configuración de passport al registrarse
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, user, pass, done) => {
    const { name, surname, email, password, rut, telefono, pais, profesion } = req.body;
    const newUser = {
        nombre: name,
        apellido: surname,
        id_rango: 2,
        profesion,
        correo: email,
        telefono,
        rut,
        habilitado_u: 1,
        id_pais: pais,
        password,
        url_foto_usuario: "/defaultProfile.PNG"
    }
    newUser.password = await helpers.encrypPassword(newUser.password); //<- Encripta la contraseña
    try {
        await pool.query('INSERT INTO usuario set ?', [newUser]);
        delete newUser.password;
        return done(null, newUser);
    } catch (error) {
        return done(null, false, { message: "El correo ya está en uso" });
    }
}));


// Facebook
passport.use(new FacebookStrategy({
    clientID: llaves.FACEBOOK.clientID,
    clientSecret: llaves.FACEBOOK.clientSecret,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['name', 'photos', 'email'],
    passReqToCallback: true
}, async(request, accessToken, refreshToken, profile, cb) => {
    const email = profile.emails[0].value; //<- Email
    const rows = await pool.query('SELECT * FROM usuario WHERE correo = ?', [email]);
    if (rows.length > 0) return cb(null, rows[0]); //Ya está guardado el correo en la bd
    const newUser = { //Creando nuevo usuario
        nombre: profile.name.givenName,
        apellido: profile.name.familyName,
        id_rango: 2,
        correo: email,
        telefono: "",
        rut: "",
        habilitado_u: 1,
        id_pais: "",
        password: "",
        url_foto_usuario: profile.photos[0].value
    }
    newUser.password = await helpers.encrypPassword(newUser.Contrasenia);
    await pool.query('INSERT INTO usuario set ?', [newUser]); //Guardando en la bd
    return cb(null, newUser);
}));

// Google
passport.use(new GoogleStrategy({
    clientID: llaves.GOOGLE.clientID,
    clientSecret: llaves.GOOGLE.clientSecret,
    callbackURL: "/auth/google/callback",
    passReqToCallback: true
}, async(request, accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value; //<- Email
    const rows = await pool.query('SELECT * FROM usuario WHERE correo = ?', [email]);
    if (rows.length > 0) return done(null, rows[0]); //Ya está guardado el correo en la bd
    const newUser = { //Creando nuevo usuario
        nombre: profile.name.givenName,
        apellido: profile.name.familyName,
        id_rango: 2,
        correo: email,
        telefono: "",
        rut: "",
        habilitado_u: 1,
        id_pais: 1,
        password: "",
        url_foto_usuario: profile.photos[0].value
    }
    await pool.query('INSERT INTO usuario set ?', [newUser]); //Guardando en la bd
    return done(null, newUser);
}));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async(user, done) => {
    done(null, user);
});