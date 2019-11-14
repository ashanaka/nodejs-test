const express = require('express');
let router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

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
    }
})

function updateEmployee(req, res){
    Employee.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.redirect('employee/list');
        }else{
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

function insertEmployee(req, res) {
    let employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
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
                list: doc
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