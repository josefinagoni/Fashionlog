var express = require('express');
var router = express.Router();

let indexController = require('../controllers/indexController');

const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images/users/'))
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

router.get('/login', indexController.login);
router.post('/login', indexController.loginValidate);
router.post('/logout', indexController.logout);

router.get('/register', indexController.register);
router.post('/register', upload.single('img'),indexController.registerCreateUser);

router.get('/profile/:id', indexController.profile);
router.post('/edit-profile',upload.single('img'), indexController.editProfile); 
router.get('/edit-profile/:id', indexController.vistaEditProfile); 

module.exports = router;