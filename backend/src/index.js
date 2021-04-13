const express = require('express');
const morgan = require('morgan');


//Initialization
const app = express();


//Settings
app.set('port', process.env.PORT || 4000);

//Middleware
app.use(morgan('dev'));

//Routes
app.use(require('./routes/index.routes'));

//Starting the server
app.listen(app.get('port'), () => {
    console.log("Server on port", app.get('port'));
});