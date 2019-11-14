const mongoose = require('mongoose');

let employeeSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: 'This filed is required'
    },
    email: {
        type: String
    },
    mobile:  {
        type: String
    },
    city: {
        type: String
    }
});

employeeSchema.path('email').validate(function (email) {
    var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return emailRegex.test(email.text); // Assuming email has a text attribute
 }, 'Invalid email');

mongoose.model('Employee', employeeSchema);