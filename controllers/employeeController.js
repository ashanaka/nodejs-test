const express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    res.render("employee/addOrEdit",
        {
            formTitle: "Insert Employee"
        }
    );
});

module.exports = router;