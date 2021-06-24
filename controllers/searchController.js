const db = require('../database/models');
const Op = db.Sequelize.Op;


module.exports = {
    buscar: (req,res) => {
        const buscar = {
            where: {
                nombre: {[Op.like]:'%' + req.query.search + '%'}
            },
            include: [{
                association: 'usuario'
            }, {
                association: 'comentario'
            }],
        };
        
        
        db.Producto.findAll(buscar).then(resultado => {
            if (resultado.length > 0) {
                res.render('search', {lista: resultado, error: null,
                usuario: resultado.usuario,
                comentario: resultado.comentario});
            }else {
                res.render('search', {
                    lista : [ ],
                    error: "No existe el producto "
                });
        }
            
        }).catch(error => {
            console.log("Error de conexion: " + error.message);
            res.render('search', {
                error: "Error de conexion"
            });
        });
        
    }
};