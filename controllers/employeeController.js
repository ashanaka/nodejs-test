const express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');
const User = mongoose.model('User');
const bcrypt = require('bcrypt');
const passport = require('passport');

router.get('/', (req, res) => {
    res.render("employee/addOrEdit",
        {
            formTitle: "Insert Employee"
        }
    );
});

router.post('/', (req, res) => {
    if (req.body._id != '') {
        updateEmployee(req, res);
    } else {
        insertEmployee(req, res);
        insertUser(req, res);
    }
})

function updateEmployee(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('employee/list');
        } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    formTitle: "Insert employee",
                    employee: req.body
                })
            } else {
                console.log("error of updating : " + err);
            }
        }
    })
}

function insertUser(req, res) {
    //Insert as a new user
    let user = new User();
    user.email = req.body.email;
    user.password = req.body.password;

    bcrypt.hash(user.password, 10, function (err, hash) {
        user.password = hash;

        user.save((err, doc) => {
            if (err) {
                console.log('error of user registration : ' + err);
            }

        });
    });

}

function insertEmployee(req, res) {

    let employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.password = req.body.password;
    employee.save((err, doc) => {
        if (!err) {
            res.redirect('employee/list');
        } else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    formTitle: "Insert employee",
                    employee: req.body
                })
            } else {
                console.log("error of insertion : " + err);
            }
        }
    });
}



router.get('/list', (req, res) => {
    Employee.find((err, doc) => {
        if (!err) {
            res.render("employee/list", {
                list: doc,
                user: req.user
            });
        } else {
            console.log("Error retrieving employee list : " + err);
        }
    });
});

//Update employee
router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('employee/addOrEdit', {
                formTitle: 'Update Employee',
                employee: doc
            })
        }
    });
});

//delete employee
router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        } else {
            console.log('error deleting employee : ' + err);
        }
    })
});


function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

module.exports = router;