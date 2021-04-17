const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

//Initialization
const app = express();


//Settings
app.set('port', process.env.PORT || 4000);

//Middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(
    cors({
        origin: "http://localhost:3000",
        credentials: true
    })
)

//Public
app.use(express.static(path.join(__dirname, "/build")));

//Routes
app.use('api/usuarios', require('./routes/usuarios.routes'));
app.use(require('./routes/index.routes'));

//Starting the server
app.listen(app.get('port'), () => {
    console.log("Server on port", app.get('port'));
});