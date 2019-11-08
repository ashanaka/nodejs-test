const express = require('express');
const bodyParser = require('body-parser');

//Initializing the app
const app = express();

const product = require('./routes/product.route');
app.use('/products', product);

const port = 5000;

app.listen(port, () =>{
    console.log("Connected via port : " + port);
});