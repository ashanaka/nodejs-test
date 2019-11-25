require('./models/db');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

require('./config/passport')(passport);


const express = require('express');

const employeeController = require('./controllers/employeeController');
const userController = require('./controllers/userController');

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

//Express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Global Variables
app.use(function(req, res, next){
    res.locals.succMsg = req.flash('succMsg');
    res.locals.errMsg = req.flash('errMsg');
    next();
});

app.use('/employee', employeeController);

app.use('/login', userController);
