const pool = require('../database');
const helpers = require('./helpers');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const llaves = require('../config');

//Configuración de passport al iniciar sesion
passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    let datosSQL = `id_usuario,password,nombre,apellido,correo,telefono,rut,habilitado_u,url_foto_usuario,profesion , id_rango, pais_n.nombre_pais AS nombre_pais_nacimiento, pais_r.nombre_pais AS nombre_pais_residencia,pais_r.url_foto_pais AS url_foto_residencia,pais_n.url_foto_pais AS url_foto_nacimiento,pais_n.id_pais AS id_pais_nacimiento, pais_r.id_pais AS id_pais_residencia`;
    let Joins = `JOIN pais AS pais_r ON pais_r.id_pais = usuario.id_pais_residencia JOIN pais AS pais_n ON pais_n.id_pais = usuario.id_pais_nacimiento`;
    const rows = await pool.query(`SELECT ${datosSQL} FROM usuario ${Joins} WHERE correo = ?`,[email]);

    if (!rows.length > 0) return done(null, false); //El usuario no existe

    if(rows[0].habilitado_u === 0) return done('Usuario inhabilitado', false, { message:'Usuario inhabilitado'});  //El usuario está inhabilitado
    
    const validPassword = await helpers.matchPassword(password, rows[0].password); //<- Verificando la contraseña
    delete rows[0].password;
    
    if (validPassword) return done(null, rows[0]); //<- Contraseña correcta
    
    done("Contraseña o Correo inválidos", false, { message: "Contraseña o Correo inválidos" }); //<-Contraseña incorrecta

}));

//Configuración de passport al registrarse
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, user, pass, done) => {
    const { name, surname, email, password, rut, telefono, id_pais_nacimiento,id_pais_residencia, profesion } = req.body;
    const newUser = {
        nombre: name,
        apellido: surname,
        id_rango: 2,
        profesion,
        correo: email,
        telefono,
        rut,
        habilitado_u: 1,
        id_pais_nacimiento,
        id_pais_residencia,
        password,
        url_foto_usuario: "/defaultProfile.PNG"
    }
    newUser.password = await helpers.encrypPassword(newUser.password); //<- Encripta la contraseña
    try {
        const data = await pool.query('INSERT INTO usuario set ?', [newUser]);
        delete newUser.password;
        newUser.id_usuario = data.insertId;
        newUser.url_foto_residencia = req.body.url_foto_residencia;
        newUser.url_foto_nacimiento = req.body.url_foto_nacimiento;
        return done(null, newUser);
    } catch (error) {
        return done(null, false, { error: "El correo ya está en uso" });
    }
}));


// Facebook
// passport.use(new FacebookStrategy({
//     clientID: llaves.FACEBOOK.clientID,
//     clientSecret: llaves.FACEBOOK.clientSecret,
//     callbackURL: "/auth/facebook/callback",
//     profileFields: ['name', 'photos', 'email'],
//     passReqToCallback: true
// }, async(request, accessToken, refreshToken, profile, cb) => {
//     const email = profile.emails[0].value; //<- Email
//     const rows = await pool.query('SELECT * FROM usuario WHERE correo = ?', [email]);
//     if (rows.length > 0) return cb(null, rows[0]); //Ya está guardado el correo en la bd
//     const newUser = { //Creando nuevo usuario
//         nombre: profile.name.givenName,
//         apellido: profile.name.familyName,
//         id_rango: 2,
//         correo: email,
//         telefono: "",
//         rut: "",
//         habilitado_u: 1,
//         id_pais: "",
//         password: "",
//         url_foto_usuario: profile.photos[0].value
//     }
//     newUser.password = await helpers.encrypPassword(newUser.Contrasenia);
//     const data = await pool.query('INSERT INTO usuario set ?', [newUser]); //Guardando en la bd
//     newUser.id_usuario = data.insertId;
//     return cb(null, newUser);
// }));

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
        id_pais_nacimiento: "AF",
        id_pais_residencia: "AF",
        password: "",
        url_foto_usuario: profile.photos[0].value
    }
    const data = await pool.query('INSERT INTO usuario set ?', [newUser]); //Guardando en la bd
    newUser.id_usuario = data.insertId;
    return done(null, newUser);
}));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async(user, done) => {
    done(null, user);
});