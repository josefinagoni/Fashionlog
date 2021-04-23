var express = require('express');
var router = express.Router();

let indexController = require('../controllers/indexController');
let searchController = require('../controllers/searchController');

router.get('/', indexController.index);
router.get('/product/:id', indexController.product);
router.get('/login', indexController.login);
router.get('/register', indexController.register);
router.get('/profile', indexController.profile);
router.get('/edit-profile', indexController.editProfile);
router.get('/add-product', indexController.addProduct);
router.get('/index-log', indexController.indexLog);
router.get('/product-log/:id', indexController.productLog);
router.get('/search', searchController.index);

module.exports = router;



