const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
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
app.use(passport.session());


//Public
app.use(express.static(path.join(__dirname, "/build")));

// Global Variables
app.use(async(req, res, next) => {
    app.locals.user = req.user;
    console.log(req.user);
    next();
});


//Routes
app.use('/api/usuarios',require('./routes/usuarios.routes'));
app.use(require('./routes/auth.routes'));
app.use(require('./routes/index.routes'));//<- siempre al ultimo

//Starting the server
app.listen(app.get('port'), () => {
    console.log("Server on port", app.get('port'));
});