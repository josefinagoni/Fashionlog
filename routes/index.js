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
router.post('/product/:id', indexController.productComentario);

router.get('/login', indexController.login);
router.post('/login', indexController.loginValidate);
router.get('/logout', indexController.logout);

router.get('/register', indexController.register);
router.post('/register', indexController.registerCreateUser);

router.get('/profile/:id', indexController.profile);
router.post('/edit-profile', indexController.editProfile); 
router.get('/edit-profile/:id', indexController.vistaEditProfile); 

router.post('/add-product', upload.single('productoAgregado'), indexController.addProduct);
router.get('/add-product', indexController.vistaAddProduct);
router.post('/edit-product', upload.single('productoAgregado'), indexController.editProduct);
router.get('/edit-product/:id', indexController.vistaEditProduct);
router.post('/delete-product', indexController.deleteProduct);

router.get('/search', searchController.buscar);

module.exports = router;



