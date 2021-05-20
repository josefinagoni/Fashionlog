const db = require('../database/models');
const Op = db.Sequelize.Op;


module.exports = {
    buscar: (req,res) => {
        const buscar = {
            where: {
                nombre: {[Op.like]:'%' + req.query.buscar + '%'}
            }
        }
        db.Producto.findAll(buscar).then(resultado => {
            res.render('search', {lista: resultado});
        }).catch(error => console.log(error))
        ;
    }
};