const db = require('../database/models');
const Op = db.Sequelize.Op;


module.exports = {
    buscar: (req,res) => {
        const buscar = {
            where: {
                nombre: {[Op.like]:'%' + req.query.search + '%'}
            }
        }
        db.Producto.findAll(buscar).then(resultado => {
            res.render('search', {lista: resultado});
        })
        ;
    }
};