const express = require('express');
const bodyParser = require('body-parser');

//Initializing the app
const app = express();

const product = require('./routes/product.route');
app.use('/products', product);

//setup connection
const mongoose = require('mongoose');
let db_url = 'mongodb://localhost/producttutorial';
const mongoDB = db_url;
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// const product = require('./controllers/product.controller');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/products', product);


const port = 5000;

app.listen(port, () =>{
    console.log("Connected via port : " + port);
});