const express = require('express');
const mongoose = require('mongoose');
require('../models/user.model');
const bcrypt = require('bcrypt');
const passport = require('passport');


const User = mongoose.model('User');
let router = express.Router();

router.get('/', (req, res) => {
  console.log(res.locals.user);
  if(res.locals.user){
    res.redirect('/employee/list');
  }else{
    res.render('login/userLogin');
  }
});

//user logout
router.get('/logout', (req, res) => {
  req.logOut();
  res.redirect('/login');
})

// Login Form POST
router.post('/', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/employee/list',
    failureRedirect: '/login',
    failureFlash: true
  })(req, res, next);
});

// router.post('/', (req, res) => {

//     User.findOne({ email: req.body.email }).then(user => {
//         if (user) {
//             //user is available
//             bcrypt.compare(req.body.password, user.password, function (err, ress) {
//                 if (ress) {
//                     // Passwords match
//                     req.flash('succMsg', 'Logged in successfully!');
//                     res.redirect('/employee/list');
//                 } else {
//                     // Passwords don't match
//                     res.render('login/userLogin',{
//                         list: req.body
//                     });
//                     req.flash('errMsg', 'Password doesn\'t match');
//                 }
//             });
//         } else {
//             //User is not available
//             req.flash('errMsg', 'User isn\'t exist!');
//             res.redirect('/employee');
//         }
//     }).catch(err => {
//         console.log(err);
//         return;
//     });
// });

module.exports = router;
