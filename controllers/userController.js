const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');

let router = express.Router();

router.get('/', (req, res) => {
    res.render('login/userLogin');
});

module.exports = router;
