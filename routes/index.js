var express = require('express');
var router = express.Router();

let indexController = require('../controllers/indexController');
let searchController = require('../controllers/searchController');

const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      let rutaDirectorio = 'public/images/nuevasimagenes';
      cb(null, rutaDirectorio);
    },
    filename: (req, file, cb) => {
      let nombreArchivo = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
      cb(null, nombreArchivo);
    }
  });
  
  const upload = multer({
    storage: storage
  });
  

router.get('/', indexController.index);
router.get('/product/:id', indexController.product);

router.get('/login', indexController.login);
router.post('/login', indexController.loginValidate);
router.get('/logout', indexController.logout);

router.get('/register', indexController.register);
router.post('/register', indexController.registerCreateUser);

router.get('/profile', indexController.profile);
router.get('/edit-profile', indexController.editProfile);
router.post('/add-product', upload.single('productoAgregado'), indexController.addProduct);
router.get('/index-log', indexController.indexLog);
router.get('/product-log/:id', indexController.productLog);
router.get('/search', searchController.buscar);





module.exports = router;



