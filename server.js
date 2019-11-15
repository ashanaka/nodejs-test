require('./models/db');

const express = require('express');

const employeeController = require('./controllers/employeeController');

const path = require('path');
const exphbs = require('express-handlebars');

let app = express();

const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());


//handlebars configuration
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts'
}));
app.set('view engine', 'hbs');

app.listen(3000, () => {
    console.log('Express server started at port : 3000');
});


app.use('/employee', employeeController);
