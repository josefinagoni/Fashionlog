const db = require('../database/models');
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs')

//const productos = require('../productos/infoProducts')
const controlador = {
    
    index: (req, res) => {
        
       
            
        
        db.Producto.findAll().then(resultado => {
            
           
            
                res.render('index', { productos: resultado, error: null});
            
               
            
            
        })
         .catch(error => {
            console.log("Error de conexion: " + error.message);
            res.render('index', {error: "Error de conexion"});
         });
// .catch(error){console.log(error)}

        // Validar si la sesion tiene un usuario cargado (si el usuario hizo login)
        
    },
    product: (req, res) => {
        const filtro = {
            include: [
                {association: 'comentario', include: 'usuario'} 
            ]

        }
        db.Producto.findByPk(req.params.id, filtro).then(resultado =>{
            if(resultado){
                res.render('product',{producto: resultado})
            }
            else{res.render('index', {error: "No existe el producto: " + error.message});}
           

       })
       .catch((error) => {
           console.log(error)
        //res.render ('error', {error: "Error de conexion: " + error.message});
    });

    },
    productComentario: (req, res) =>{
        db.Comentario.create({
            texto: req.body.comentario,
            usuario_id: req.session.usuario, //chequear validar con condicional de solo si estas logueado
            product_id: req.params.id // ?? para sacarlo de en que producto estamos va por ruta


        }).then(resultado => {
            res.redirect('/product/' + req.params.id); // a donde registro el id y ruta 
        })
        .catch((error) => {
            res.render ('error', {error: "Error de conexion: " + error.message});
        });
    },
    login: (req, res) => {
        res.render('login', {error:null})
    },
    register: (req, res) => {
        res.render('register', {})
    },

    profile: (req, res) => {
        res.render('profile', {productos: productos.lista})
    },
    editProfile: (req, res) => {
        let passEncriptada = bcrypt.hashSync(req.body.contraseña); //hay que poner esto aca??
        db.Usuario.update({
            nombre: req.body.nombre,
            nacimiento: req.body.fechanac,
            email: req.body.email,
            contrasena: passEncriptada, 
            dni: req.body.dni
        },{
            where: {
                id: req.body.id //tengo que pasar el id hidden en el form o solo asi accedo
            }
        }).then(resultado=>{
            res.redirect('/profile' + resultado.id) 
        })
        .catch(error => {
            console.log("Error de conexion: " + error.message);
            res.render('index', {error: "Error de conexion"});
        });    
    },
    vistaEditProfile: (req, res) => {
        db.Usuario.findByPk(req.params.id).then(resultado =>{
            res.render('editProfile',{usuario: resultado});
        
        } )
        .catch(error => {
            console.log("Error de conexion: " + error.message);
            res.render('index', {error: "Error de conexion"});
        }); 
    },
    addProduct: (req, res) => {
        let productoNuevo =  req.body.nombre; 

      //  if (productoNuevo.includes('feo')) {
         // console.log('El nombre del producto no puede contener la palabra feo') ;
         // res.render('profile', {error: 'El nombre del producto no puede contener la palabra feo'})
      //  } else{
            db.Producto.create({
            nombre: productoNuevo,//,descripcion: req.body.descripcion como va en el form
            imagen: req.body.image,
            descripcion: req.body.descripcion,
            usuario_id: req.session.usuario //chequear esta linea


        }).then(productoCreado => {
            res.redirect('/product' + productoCreado.id);
    
        });
        
      //  }
        console.log('/images/nuevasimagenes' + req.file.filename)
       // res.render('addProduct', {})
    //   .catch(error => {
    //    console.log("Error de conexion: " + error.message);
    //    res.render('index', {error: "Error de conexion"});
    },
    vistaAddProduct: (req, res) => {
            res.render('addProduct')
    },
    registerCreateUser: (req, res) => {
        let passEncriptada = bcrypt.hashSync(req.body.contraseña);
        db.Usuario.create({
            nombre: req.body.nombre,
            nacimiento: req.body.fechanac,
            email: req.body.email,
            contrasena: passEncriptada, 
            dni: req.body.dni
        }).then(usuario=> {
            req.session.usuario = {
                id: usuario.id,
                nombre: usuario.nombre
            }
            res.redirect('/index')
        })
        .catch(error => {
            console.log("Error de conexion: " + error.message);
            res.render('index', {error: "Error de conexion"});
        }); 

    },
    loginValidate: (req, res) =>{
        // Filtramos el usuario a traves de un campo que sea UNICO en la base de datos
        const filtro = {
            where: {
                email: req.body.email
            }
        }
          // Buscamos el usuario que deberia ser unico
        db.Usuario.findOne(filtro).then(usuario=> {
             // Comparamos la contraseña ingresada en el login (req.body.pass)
            // con la que ingresada en el registro (usuario.pass)
            if (bcrypt.compareSync(req.body.contraseña, usuario.contrasena) && usuario) {
                req.session.usuario = {
                    id: usuario.id,
                    nombre: usuario.nombre
                }
                res.redirect('/index')
            
             // En caso de que haya seleccionado recodarme, guardamos una cookie
            } else {
                res.render('index', {
                    error:"El mail o la contrseña son incorrectos"
                })
            }
          //  if(req.body.remember){
            //    res.cookie('userId', usuario.id, { maxAge: 1000 * 60 * 5 });
           // }
            
        })
        .catch(error => {
            console.log("Error de conexion: " + error.message);
            res.render('index', {error: "Error de conexion"});
        }); 
        
    },
    logout: (req, res) => {
        // Borramos la sesion del servidor
        req.session.destroy();
        // Eliminamos la cookie del cliente
        res.clearCookie('userId');
        res.redirect('/index');
    },
    vistaEditProduct: (req, res) =>{
        db.Producto.findByPk(req.params.id).then(resultado =>{
            res.render('editProduct',{producto: resultado});
        
        } )
        .catch(error => {
            console.log("Error de conexion: " + error.message);
            res.render('index', {error: "Error de conexion"});
        }); 
    },
    editProduct: (req, res) =>{
        db.Producto.update({
            nombre: req.body.nombre,
            imagen: req.body.image,
            descripcion: req.body.descripcion,
            usuario_id: req.session.usuario //chequear esta linea

        },{
            where: {
                id: req.body.id //tengo que pasar el id hidden en el form o solo asi accedo
            }
        }).then(resultado=>{
            res.redirect('/index' + resultado.id) //esto???
        })
        .catch(error => {
            console.log("Error de conexion: " + error.message);
            res.render('index', {error: "Error de conexion"});
        }); 
    },
    deleteProduct: (req, res) =>{
        db.Producto.destroy({
            where: {
                id: req.body.id
            }}).then(resultado=>{
                res.redirect('/index')
            })
             .catch(error => {
                console.log("Error de conexion: " + error.message);
                res.render('index', {error: "Error de conexion"});
                }); 
    }
    
};

module.exports = controlador;
