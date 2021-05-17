module.exports = (sequelize, dataTypes) => {

    const Comentario = sequelize.define('Comentario', {
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
        tableName: "comentarios",
        timestamps: false
    });

    return Comentario;
}
