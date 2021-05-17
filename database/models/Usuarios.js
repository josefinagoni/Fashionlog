module.exports = (sequelize, dataTypes) => {

    const Usuario = sequelize.define('Usuario', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        nombre: {
            type: dataTypes.STRING
        },
       nacimiento: {
            type: dataTypes.DATE
            
        },
        email: {
            type: dataTypes.STRING
            
        },
        contraseña: {
            type: dataTypes.STRING
            
        },
        dni: {
            type: dataTypes.INTEGER
<<<<<<< HEAD
            
        },
            estado: {
=======
        },
        estado: {
>>>>>>> 5e42298f713887d8fe36e3a80872b698841fe6ba
            type: dataTypes.STRING
            
        }
    }, {
        tableName: "usuarios",
        timestamps: false
    });

    return Usuario;
}

