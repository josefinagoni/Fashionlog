module.exports = (sequelize, dataTypes) => {

    const Comentario = sequelize.define('Comentario', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        texto: {
            type: dataTypes.STRING
        },
        usuario_id: {
            type: dataTypes.INTEGER

        },
        producto_id: {
            type: dataTypes.INTEGER
        },

        createdAt: {
            type: dataTypes.DATE

    

        },
        updatedAt: {
            type: dataTypes.DATE
        
        },


        
    }, {
        tableName: "comentarios",
        timestamps: false
    });

    return Comentario;
}
