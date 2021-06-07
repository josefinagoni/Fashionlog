const db = require('../database/models');
const Op = db.Sequelize.Op;
const bcrypt = require('bcryptjs')

//const productos = require('../productos/infoProducts')
const controlador = {
    
    index: (req, res) => {
        
        const filtro = {
            order: [
                ['fecha', 'ASC']
            ]};
        
        db.Producto.findAll(filtro).then(resultado => {
            
           
            if (req.session.usuario){
                res.render('index', {usuario: req.session.usuario, productos: resultado, error: null});
            } else {
                res.render('index', {usuario: "anonimo", productos: resultado, error: null});
            }
            
        })
         .catch(error => {
            console.log("Error de conexion: " + error.message);
            res.render('index', {error: "Error de conexion"});
         });
// .catch(error){console.log(error)}

        // Validar si la sesion tiene un usuario cargado (si el usuario hizo login)
        
    },
    product: (req, res) => {
       db.Producto.findByPk(req.params.id).then(resultado =>{
           res.render('product',{producto: resultado})
       });

       //ver como es lo de agregar comentarios
      // db.Comentarios.create({
        //comment: req.body.comentario
    //}).then(commentCreado => {
      //  res.redirect('/product/'+ commentCreado.id);
  //  });
        //que hay que poner en el redirect de comentario creado
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
        let productoNuevo =  req.body.nombre; 

      //  if (productoNuevo.includes('feo')) {
         // console.log('El nombre del producto no puede contener la palabra feo') ;
         // res.render('profile', {error: 'El nombre del producto no puede contener la palabra feo'})
      //  } else{
            db.Producto.create({
            nombre: productoNuevo //,descripcion: req.body.descripcion como va en el form

        }).then(productoCreado => {
            res.redirect('/product/' + productoCreado.id);
        });
      //  }
        console.log('/images/nuevasimagenes' + req.file.filename);
       // res.render('addProduct', {})
    },
    vistaAddProduct: (req, res) => {
            res.render('addProduct')
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
            if (bcyrpt.compareSync(req.body.contraseña, usuario.pass)) {
                req.session.usuario = usuario.email;
            
             // En caso de que haya seleccionado recodarme, guardamos una cookie
            }
            if(req.body.remember){
                res.cookie('userId', usuario.id, { maxAge: 1000 * 60 * 5 });
            }
            res.redirect('/index')
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
        db.Productos.findByPk(req.params.id).then(resultado =>{
            res.render('editProduct',{producto: resultado});
        
        } )},
    editProduct: (req, res) =>{
        db.Productos.update({
            nombre: req.body.nombre //agregar el resto
        },{
            where: {
                id: req.body.id
            }
        }).then(resultado=>{
            res.redirect('/index') //dsp redirigo a producto + resultado.id
        })
    },
    deleteProduct: (req, res) =>{
        db.Productos.destroy({
            where: {
                id: req.body.id
            }}).then(resultado=>{
                res.redirect('/index')})
    }
};

module.exports = controlador;