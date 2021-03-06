const db = require('../database/models');
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs')

const controlador = {

    index: (req, res) => {

        const filtro = {
            include: [{
                association: 'usuario'
            }, {
                association: 'comentario'
            }],
            order: [
                ["createdAt", "DESC"]
            ]
        };
        const filtro2 = {
            include: [{
                association: 'usuario'
            }, {
                association: 'comentario'
            }],
            order: [
                ["createdAt", "ASC"]
            ]
        };


        db.Producto.findAll(filtro).then(resultado => {
                db.Producto.findAll(filtro2).then(resultado2 => {


                    res.render('index', {
                        productos: resultado,
                        error: null,
                        productos2: resultado2,

                    });
                })
            })

            .catch(error => {
                console.log("Error de conexion: " + error.message);
                res.render('index', {
                    error: "Error de conexion"
                });
            });
        

        

    },
    product: (req, res) => {
        const filtro = {
            include: [{
                association: 'comentario',
                include: [{
                    association: 'usuario'
                }]

            }, {
                association: 'usuario'
            }],
            order: [
                ["comentario", "createdAt", "DESC"]
            ]
        }
        db.Producto.findByPk(req.params.id, filtro).then(resultado => {
                if (resultado) {
                    res.render('product', {
                        producto: resultado
                    })
                } else {
                    res.render('index', {
                        error: "No existe el producto: " + error.message
                    });
                }


            })
            .catch((error) => {
                console.log(error)

            });

    },
    productComentario: (req, res) => {
        db.Comentario.create({
                texto: req.body.comentario,
                usuario_id: req.session.usuario.id, 
                producto_id: req.body.id 


            }).then(resultado => {
                res.redirect('/index/product/' + req.body.id); 
            })
            .catch((error) => {
                res.render('error', {
                    error: "Error de conexion: " + error.message
                });
            });
    },
    borrarComentario: (req, res) => {
        db.Comentario.destroy({
            where: [{
                id: req.body.id
            }]
        }).then(resultado => {
            res.redirect('/index/')
        })


    },
    login: (req, res) => {
        res.render('login', {
            error: null
        })
    },
    register: (req, res) => {
        res.render('register', {})
    },

    profile: (req, res) => {
        const filtro = {
            include: [{
                association: 'productos',
                include: [{
                    association: "comentario"
                }]
            }, {
                association: 'comentario'
            }]
        };
        db.Usuario.findByPk(req.params.id, filtro).then(resultado => {
                if (resultado) {
                    res.render('profile', {
                        usuario: resultado,
                    })
                } else {
                    res.render('profile', {
                        error: "No existe el perfil: "
                    });
                }
            })
            .catch((error) => {
                console.log(error)

            });
    },
    editProfile: (req, res) => {
        let passEncriptada = bcrypt.hashSync(req.body.contrase??a);
        let errors = {};
        db.Usuario.findOne({
          where: {
          nombre: req.body.email
         }
         }).then(resultado => {
         if (resultado) {
          errors.message = "El email ya ha sido utilizado"
           res.locals.errors = errors
        return res.render("editProfile")
          }else{
        db.Usuario.update({
            nombre: req.body.nombre,
            nacimiento: req.body.fechanac,
            email: req.body.email,
            contrasena: passEncriptada,
            dni: req.body.dni,
            imagen: req.file.filename
        }, {
            where: {
                id: req.body.id
            }
        }).then(resultado => {
            res.redirect('/index/profile/' + req.body.id)
        });
        }
        })
    },
    vistaEditProfile: (req, res) => {
        db.Usuario.findByPk(req.params.id).then(resultado => {
            res.render('editProfile', {
                usuario: resultado
            });

        })
    },
    addProduct: (req, res) => {
        let errors = {}
        if (!req.body.nombre || !req.file || !req.body.descripcion) {
            errors.message = "Debe completar todos los campos para crear un producto"
            res.locals.errors = errors
            return res.render("addProduct")
        };

        db.Producto.findOne({
            where: {
                nombre: req.body.nombre
            }
        }).then(resultado => {
            if (resultado) {
                errors.message = "El nombre del producto ya ha sido utilizado"
                res.locals.errors = errors
                return res.render("addProduct")
            } else {
                db.Producto.create({
                    nombre: req.body.nombre,
                    imagen: req.file.filename,
                    descripcion: req.body.descripcion,
                    usuario_id: req.session.usuario.id


                }).then(productoCreado => {
                    res.redirect('/index/product/' + productoCreado.id) 
                });
            }
        })
    },
    vistaAddProduct: (req, res) => {
        res.render('addProduct')
    },
    registerCreateUser: (req, res) => {
        let passEncriptada = bcrypt.hashSync(req.body.contrase??a);
        let errors = {}
        if (!req.body.nombre || !req.body.fechanac || !req.body.email || !req.body.contrase??a || !req.body.dni || !req.file) {
            errors.message = "Hay que llenar todos los campos"
            res.locals.errors = errors
            return res.render("register")
        };

        db.Usuario.findOne({
            where: {
                email: req.body.email
            }
        }).then(resultado => {
            if (resultado) {
                errors.message = "este mail ya fue usado"
                res.locals.errors = errors
                return res.render("register")
            } else {
                db.Usuario.create({
                    nombre: req.body.nombre,
                    nacimiento: req.body.fechanac,
                    email: req.body.email,
                    contrasena: passEncriptada,
                    dni: req.body.dni,
                    imagen: req.file.filename
                }).then(usuario => {
                    req.session.usuario = {
                        id: usuario.id,
                        nombre: usuario.nombre,
                        imagen: usuario.imagen
                    }
                    if (req.body.remember) {
                        res.cookie("userId", usuario.id, {
                            maxAge: 1000 * 60 * 5
                        })
                    }
                    res.redirect('/index')
                })
            }
        })


    },
    loginValidate: (req, res) => {
        const filtro = {
            where: {
                email: req.body.email
            }
        }
        // Buscamos el usuario que deberia ser unico
        db.Usuario.findOne(filtro).then(usuario => {
            if (usuario && bcrypt.compareSync(req.body.contrase??a, usuario.contrasena)) {
                req.session.usuario = {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    imagen: usuario.imagen
                }
                if (req.body.remember) {
                    res.cookie("userId", usuario.id, {
                        maxAge: 1000 * 60 * 5
                    })
                }
                res.redirect('/index')

            } else {
                res.render('login', {
                    error: "El mail o la contrse??a son incorrectos"
                })
            }

        });

    },
    logout: (req, res, next) => {
        // Borramos la sesion del servidor
        req.session.destroy();
        // Eliminamos la cookie del cliente
        res.clearCookie('userId');
        res.redirect('/index');
    },
    vistaEditProduct: (req, res) => {
        db.Producto.findByPk(req.params.id).then(resultado => {
            res.render('editProduct', {
                producto: resultado
            });

        })
    },
    editProduct: (req, res) => {
        db.Producto.update({
            nombre: req.body.nombre,
            imagen: req.file.filename,
            descripcion: req.body.descripcion,
        }, {
            where: {
                id: req.body.id
            }
        }).then(resultado => {
            res.redirect('/index/product/' + req.body.id)
        });

    },
    deleteProduct: (req, res) => {
        db.Producto.destroy({
            where: {
                id: req.body.id
            }
        }).then(resultado => {
            res.redirect('/index')
        })
    }

};

module.exports = controlador;