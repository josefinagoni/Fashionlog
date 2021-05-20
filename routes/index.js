var express = require('express');
var router = express.Router();

let indexController = require('../controllers/indexController');
let searchController = require('../controllers/searchController');

router.get('/', indexController.index);
router.get('/product/:id', indexController.product);
router.get('/login', indexController.login);
router.post('/login', indexController.loginValidate);
router.get('/register', indexController.register);
router.post('/register', indexController.registerCreateUser)
router.get('/profile', indexController.profile);
router.get('/edit-profile', indexController.editProfile);
router.post('/add-product', indexController.addProduct);
router.get('/index-log', indexController.indexLog);
router.get('/product-log/:id', indexController.productLog);
router.get('/search', searchController.buscar);



module.exports = router;



