const pool = require('../database');
const helpers = require('./helpers');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FACEBOOK = {
    clientID: "2970891296478501",
    clientSecret: "fd4bd2d5dd781edde534732440143e97"
};
const GOOGLE = {
    clientID: "273786638957-48ob5nklg1iv09qls3a1ihnbea1me0j1.apps.googleusercontent.com",
    clientSecret: "zZPU5xVhos4q4_mECto3x1wT"
};

//Configuración de passport al iniciar sesion
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE  Correo = ?', [email]); //<- Buscamos al usuario

    if (!rows.length > 0) return done(null, false); //El usuario no existe

    const validPassword = await helpers.matchPassword(password, rows[0].Contrasenia); //<- Verificando la contraseña

    if (validPassword) return done(null, rows[0]); //<- Contraseña correcta
    done(null, false); //<-Contraseña incorrecta

}));

//Configuración de passport al registrarse
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, user, pass, done) => {
    const rows = await pool.query('SELECT * FROM usuarios WHERE  Correo = ?', [user]);
    if (rows.length > 0) return done(null, false, { message: "El correo ya está en uso" }); //Por si existe un correo ya
    const { name, surname, email, password } = req.body;
    const newUser = {
        Nombres: name,
        Apellidos: surname,
        Rango: "user",
        Correo: email,
        Contrasenia: password,
        Url_Foto: "/defaultProfile.PNG"
    }
    newUser.Contrasenia = await helpers.encrypPassword(newUser.Contrasenia); //<- Encripta la contraseña
    await pool.query('INSERT INTO usuarios set ?', [newUser]);
    return done(null, newUser);
}));


// Facebook
passport.use(new FacebookStrategy({
    clientID: FACEBOOK.clientID,
    clientSecret: FACEBOOK.clientSecret,
    callbackURL: "/auth/facebook/callback",
    profileFields: ['name', 'photos', 'email'],
    passReqToCallback: true
}, async(request, accessToken, refreshToken, profile, cb) => {
    const email = profile.emails[0].value; //<- Email
    const rows = await pool.query('SELECT * FROM usuarios WHERE Correo = ?', [email]);
    if (rows.length > 0) return cb(null, profile); //Ya está guardado el correo en la bd
    const newUser = { //Creando nuevo usuario
        Nombres: profile.name.givenName,
        Apellidos: profile.name.familyName,
        Rango: "user",
        Correo: email,
        Contrasenia: "",
        Url_Foto: profile.photos[0].value
    }
    await pool.query('INSERT INTO usuarios set ?', [newUser]); //Guardando en la bd
    return cb(null, profile);
}));

// Google
passport.use(new GoogleStrategy({
    clientID: GOOGLE.clientID,
    clientSecret: GOOGLE.clientSecret,
    callbackURL: "/auth/google/callback",
    passReqToCallback: true
}, async(request, accessToken, refreshToken, profile, done) => {
    const email = profile.emails[0].value; //<- Email
    const rows = await pool.query('SELECT * FROM usuarios WHERE Correo = ?', [email]);
    if (rows.length > 0) return done(null, profile); //Ya está guardado el correo en la bd
    const newUser = { //Creando nuevo usuario
        Nombres: profile.name.givenName,
        Apellidos: profile.name.familyName,
        Rango: "user",
        Correo: email,
        Contrasenia: "",
        Url_Foto: profile.photos[0].value
    }
    await pool.query('INSERT INTO usuarios set ?', [newUser]); //Guardando en la bd
    return done(null, profile);
}));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async(user, done) => {
    done(null, user);
});