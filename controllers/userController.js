const express = require('express');
const mongoose = require('mongoose');
require('../models/user.model');


const User = mongoose.model('User');
let router = express.Router();

router.get('/', (req, res) => {
    res.render('login/userLogin');
});

router.post('/', (req, res) => {
    console.log(req.body.email);
    User.findOne({email: req.body.email}).then(user => {
        if(user){
            res.redirect('/employee/list');
            // console.log('user is available');
        }else{
            res.redirect('/employee');
        }
    }).catch( err => {
        console.log(err);
        return;
    });
})

module.exports = router;
