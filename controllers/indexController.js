const db = require('../database/models');
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs')

const productos = require('../productos/infoProducts')
const controlador = {
    index: (req, res) => {
        
        res.render('index', {productos: productos.lista})
    },
    product: (req, res) => {
        //let id = req.params.id
       // for (let index = 0; index < productos.lista.length; index++) {
           // const element = productos.lista[index];
           // if (element.id== id) {
          //      res.render('product', {producto: element})
            //}
       // }
       db.Producto.findByPk(req.params.id).then(resultado =>{
           res.render('product',{producto: resultado})
       }

       )
        
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
        db.Producto.create({
            nombreProducto: req.body.nombre
        }).then(productoCreado => {
            res.redirect('/product/' + productoCreado.id);
        });
       // res.render('addProduct', {})
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
    },
    registerCreateUser: (req, res) => {
        let passEncriptada = bcrypt.hashSync(req.body.contraseña);
        db.Usuario.create({
            mail: req.body.mail,
            pass: passEncriptada
        }).then(usuario=> {
            res.redirect('/index')
        })

    },
    loginValidate: (req, res) =>{
        const filtro = {
            where: {
                mail: req.body.mail
            }
        }
        db.Usuario.findOne(filtro).then(resultado=> {
            if (bcyrpt.compareSync(req.body.contraseña, resultado.pass)) {
                req.session.usuario = usuario.mail
            }
            res.redirect('/index')
        })
        //faltan cookies
    }
};

module.exports = controlador;