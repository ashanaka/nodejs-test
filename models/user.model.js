const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String
    }
});

mongoose.model('User', userSchema);