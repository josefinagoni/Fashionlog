const db = require('../database/models');
const Op = db.Sequelize.Op;


module.exports = {
    buscar: (req, res) => {
        const buscar = {
            where: {
                nombre: {
                    [Op.like]: '%' + req.query.search + '%'
                }
            },
            include: [{
                association: 'usuario'
            }, {
                association: 'comentario'
            }],
        };


        db.Producto.findAll(buscar).then(resultado => {
            res.render('search', {
                lista: resultado,
                error: null,
                usuario: resultado.usuario,
                comentario: resultado.comentario});
        }).catch(error => {
            console.log("Error de conexion: " + error.message);
            res.render('index', {
                error: "No existe el producto"
            });
        });
        
    }
};