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
        estado: {
            type: dataTypes.STRING
            
        }
    }, {
        tableName: "usuarios",
        timestamps: false
    });

    return Usuario;
}
