const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const ctrlTema = require('./controllers/tema.controllers');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
const { database } = require('./keys');

//Initialization
const app = express();
require('./lib/passport');

//Settings
app.set('port', process.env.PORT || 4000);


// Middleware
app.use(session({ /*Guarda la session en la BD*/
    secret: 'famir_session',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}))

app.use(express.json()); /* El servidor accepta json */
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(
    cors({
        origin: "http://localhost:3000", //Asi el frontend puede hacer peticiones
        credentials: true
    })
);
app.use(passport.initialize()); /* Inicializa passport */
app.use(passport.session({ cookie: { maxAge: 3600 } }));

//Public
app.use(express.static(path.join(__dirname, "/build")));

// Global Variables
app.use(async(req, res, next) => {
    // console.log(req.user);
    app.locals.user = req.user;
    next();
});


//Routes
app.get('/video-lock', ctrlTema.getVideo);
app.use('/api/material', require('./routes/material.routes'));
app.use('/api/tema', require('./routes/tema.routes'));
app.use('/api/modulos', require('./routes/modulos.routes'));
app.use('/api/cursos', require('./routes/cursos.routes'));
app.use('/api/profesores', require('./routes/profesores.routes'));
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/estudiantes', require('./routes/estudiantes.routes'));
app.use(require('./routes/auth.routes'));
app.use(require('./routes/index.routes')); //<- siempre al ultimo

//Starting the server
app.listen(app.get('port'), () => {
    console.log("Server on port", app.get('port'));
});