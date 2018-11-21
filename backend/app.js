//Require packages
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

//Configure .ENV file
// require('dotenv').config()

//Require routes
const entry = require('./routes/entry');
// const admin = require('./routes/admin');
// const statistics = require('./routes/statistics');

//Require middleware
// const auth = require('./middleware/auth')

//Setup express
const app = express();

//Setup cors
app.use(cors());

//Disable `x-powered-by: Express` message in header
app.disable('x-powered-by');

//Connect to db
mongoose
    .connect('mongodb://admin:admin12@ds211558.mlab.com:11558/scottdb', { useNewUrlParser: true })
    .then(() => console.log('Connected successfully to MLAB server'))
    .catch((err) => console.log(`Error connecting to MLAB server : ${err}`));

//Setup morgan
app.use(morgan(process.env.ENVIRONMENT || 'dev'));


//Setup body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Use auth middleware
// app.use(auth);

//Setup routes
app.use('/entry', entry);
// app.use('/admin', admin);
// app.use('/statistics', statistics);

//Handle errors
app.use((req, res, next) => {
    let error = new Error("Page Not Found");
    error.status = 404;
    error.message = "Page Not Found";

    //Send error
    next(error);
});

//Handle errors
app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error
        }
    });
});

//Export app
module.exports = app;