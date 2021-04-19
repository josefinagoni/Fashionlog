const productos = require('../productos/infoProducts');


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
    search: (req, res) => {
        res.render('search', {})
    },
    profile: (req, res) => {
        res.render('profile', {})
    },
    editProfile: (req, res) => {
        res.render('editProfile', {})
    },
    addProduct: (req, res) => {
        res.render('addProduct', {})
    }
};

module.exports = controlador;