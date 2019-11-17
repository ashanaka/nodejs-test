const express = require('express');
const mongoose = require('mongoose');
require('../models/user.model');
const bcrypt = require('bcrypt');


const User = mongoose.model('User');
let router = express.Router();

router.get('/', (req, res) => {
    res.render('login/userLogin');
});

router.post('/', (req, res) => {

    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            bcrypt.compare(req.body.password, user.password, function (err, ress) {
                if (ress) {
                    // Passwords match
                    res.redirect('/employee/list');
                } else {
                    // Passwords don't match
                }
            });

            // console.log('user is available');
        } else {
            res.redirect('/employee');
        }
    }).catch(err => {
        console.log(err);
        return;
    });
});

module.exports = router;
