const db = require('../database/models');
const Op = db.Sequelize.Op;


module.exports = {
    buscar: (req,res) => {
        const buscar = {
            where: {
                nombre: {[Op.like]:'%' + req.query.search + '%'}
            }
        };
        const filtro = {
            include: [{
                association: 'usuario'
            }, {
                association: 'comentario'
            }],
        };
        db.Producto.findAll(buscar, filtro).then(resultado => {
            res.render('search', {lista: resultado, error: null,
                usuario: resultado.usuario,
                comentario: resultado.comentario});
        })
        
    }
};