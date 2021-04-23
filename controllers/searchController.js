const products = require('../productos/infoProducts');

const controller = {
    index: (req,res) => res.render('search', {resultados:products.porNombre(req.query.search),search:req.query.search.toUpperCase()}),
}


module.exports = controller;