const controlador = {
    index: (req, res) => {
        res.render('index', {})
    },
    product: (req, res) => {
        res.render('product', {})
    },
    login: (req, res) => {
        res.render('login', {})
    },
    register: (req, res) => {
        res.render('register', {})
    },
    search: (req, res) => {
        res.render('search', {})
    },
    profile: (req, res) => {
        res.render('profile', {})
    }

};

module.exports = controlador;