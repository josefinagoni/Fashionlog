<<<<<<< HEAD
const productos = require('../productos/infoProducts');

=======
const db = require('../database/models');
const Op = db.Sequelize.Op;

const productos = require('../productos/infoProducts')
>>>>>>> a204a18c4d475406fb16e85e2762cde010f1e409
const controlador = {
    index: (req, res) => {
        
        res.render('index', {productos: productos.lista})
    },
    product: (req, res) => {
        let id = req.params.id
        for (let index = 0; index < productos.lista.length; index++) {
            const element = productos.lista[index];
            if (element.id== id) {
                res.render('product', {producto: element})
            }
        }
        
    },
    login: (req, res) => {
        res.render('login', {})
    },
    register: (req, res) => {
        res.render('register', {})
    },

    profile: (req, res) => {
        res.render('profile', {productos: productos.lista})
    },
    editProfile: (req, res) => {
        res.render('editProfile', {})
    },
    addProduct: (req, res) => {
       // db.Producto.create({
         //   nombreProducto: req.body.nombre
       // }).then(productoCreado => {
        //    res.redirect('/product/' + productoCreado.id);
      //  });
        res.render('addProduct', {})
    },
    indexLog: (req, res) => {
        
        res.render('indexLog', {productos: productos.lista})
    },
    productLog: (req, res) => {
        
        let id = req.params.id
        for (let index = 0; index < productos.lista.length; index++) {
            const element = productos.lista[index];
            if (element.id== id) {
                res.render('productLog', {producto: element})
            }
        }
    }
};

module.exports = controlador;