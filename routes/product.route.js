const express = require('express');
const router = express.Router();

//Require the controller
const product_controller = require('../controllers/product.controller');

//test file to check commiunication
// router.get('/test', product_controller.test);
router.post('/create', product_controller.product_create);

module.exports = router;