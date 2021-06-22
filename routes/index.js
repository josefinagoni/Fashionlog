var express = require('express');
var router = express.Router();

let indexController = require('../controllers/indexController');
let searchController = require('../controllers/searchController');

const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images/products/'))
  },
    // destination: (req, file, cb) => {
    //   let rutaDirectorio = '/public/images/nuevasimagenes';
    //   cb(null, rutaDirectorio);
    // },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
      // let nombreArchivo = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
      // cb(null, nombreArchivo);
    }
  });
  
  const upload = multer({
    storage: storage
  });
  

router.get('/', indexController.index);
router.get('/product/:id', indexController.product);
router.post('/product/comentario', indexController.productComentario);
router.post('/delete-comentario' , indexController.borrarComentario);

router.post('/add-product',upload.single('imagen'), indexController.addProduct);
router.get('/add-product', indexController.vistaAddProduct); //le agregamos :id ????
router.post('/edit-product', upload.single('imagen'), indexController.editProduct);
router.get('/edit-product/:id', indexController.vistaEditProduct);
router.post('/delete-product', indexController.deleteProduct);

router.get('/search', searchController.buscar);

module.exports = router;



