var express = require('express');
var router = express.Router();

let indexController = require('../controllers/indexController');

router.get('/', indexController.index);
router.get('/product', indexController.product);
router.get('/login', indexController.login);
router.get('/register', indexController.register);
router.get('/search', indexController.search);
router.get('/profile', indexController.profile);
router.get('/edit-profile', indexController.editProfile);
router.get('/add-product', indexController.addProduct);

module.exports = router;