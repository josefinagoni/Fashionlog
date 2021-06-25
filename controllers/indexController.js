const db = require('../database/models');
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs')

//const productos = require('../productos/infoProducts')
const controlador = {

    index: (req, res) => {

        const filtro = {
            include: [{
                association: 'usuario'
            }, {
                association: 'comentario'
            }],
            orderBy: [["producto","createdAt", "DESC"]]
        };
        const filtro2 = {
            include: [{
                association: 'usuario'
            }, {
                association: 'comentario'
            }],
            orderBy: [["producto","createdAt", "ASC"]]
        };
        
        
        db.Producto.findAll(filtro).then(resultado => {
            db.Producto.findAll(filtro2).then(resultado2 => {
                

                res.render('index', {
                    productos: resultado,
                    error: null,
                    //usuario: resultado.usuario,
                    //comentario: resultado.comentario,
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
        // .catch(error){console.log(error)}

        // Validar si la sesion tiene un usuario cargado (si el usuario hizo login)

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
            order: [["comentario","createdAt", "DESC"]]
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
                usuario_id: req.session.usuario.id, //chequear validar con condicional de solo si estas logueado
                producto_id: req.body.id // ?? para sacarlo de en que producto estamos va por ruta


            }).then(resultado => {
                res.redirect('/index/product/' + req.body.id); // a donde registro el id y ruta 
            })
            .catch((error) => {
                res.render('error', {
                    error: "Error de conexion: " + error.message
                });
            });
    },
    borrarComentario: (req, res) => {
        db.Comentario.destroy({
            where: {
                id: req.body.id
            }
        }).then(resultado => {
            res.redirect('/index')
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
                include:[{
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
                    res.render('index', {
                        error: "No existe el perfil: "
                    });
                }
            })
            .catch((error) => {
                console.log(error)

            });
    },
    editProfile: (req, res) => {
        let passEncriptada = bcrypt.hashSync(req.body.contraseña); 
        let errors = {}
        if (!req.body.nombre || !req.email) {
              errors.message = "Debe igresar su nombre y su email"
                res.locals.errors = errors
                return res.render("editProfile")
            };
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
                id: req.body.id //tengo que pasar el id hidden en el form o solo asi accedo
            }
        }).then(resultado => {
            res.redirect('/profile' + resultado.id)
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
                   return res.render("register")
                }else{
                    db.Producto.create({
                    nombre: req.body.nombre,
                    imagen: req.file.filename,
                    descripcion: req.body.descripcion,
                    usuario_id: req.session.usuario.id 
        
        
                }).then(productoCreado => {
                    res.redirect('/index/product/' + productoCreado.id) ///product/'+ productoCreado.id); ver si dirige bien
                });
            }
        })
    },
    vistaAddProduct: (req, res) => {
        res.render('addProduct')
    },
    registerCreateUser: (req, res) => {
        let passEncriptada = bcrypt.hashSync(req.body.contraseña);
        let errors = {}
         if (!req.body.nombre || !req.body.fechanac || !req.body.email || !req.body.contraseña || !req.body.dni || !req.file) {
           errors.message = "hay que llenar todos los campos"
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
             }else {
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
        // Filtramos el usuario a traves de un campo que sea UNICO en la base de datos
        const filtro = {
            where: {
                email: req.body.email
            }
        }
        // Buscamos el usuario que deberia ser unico
        db.Usuario.findOne(filtro).then(usuario => {
            // Comparamos la contraseña ingresada en el login (req.body.pass)
            // con la que ingresada en el registro (usuario.pass)
            if (usuario  && bcrypt.compareSync(req.body.contraseña, usuario.contrasena)  ) {
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

                // En caso de que haya seleccionado recodarme, guardamos una cookie
            } else {
                res.render('login', {
                 error: "El mail o la contrseña son incorrectos"
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
        let errors = {}
        if (!req.body.nombre || !req.file || !req.body.descripcion) {
              errors.message = "Debe completar todos los campos para editar el producto"
                res.locals.errors = errors
                return res.render("editProduct")
            };
        db.Producto.findOne({
            where: {
                nombre: req.body.nombre
                }
                }).then(resultado => {
            if (resultado) {
                errors.message = "El nombre del producto ya ha sido utilizado"
                res.locals.errors = errors
            return res.render("editProduct")
            }else{ 
        db.Producto.update({
            nombre: req.body.nombre,
            imagen: req.file.filename,
            descripcion: req.body.descripcion,
            }, {
            where: {
                id: req.body.id
            }
        }).then(resultado => {
            res.redirect('/index/product/' + resultado.id)
        });
    }
    }) 
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