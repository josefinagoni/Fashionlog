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
        
    });

    Comentario.associate = (db)  => {
        Comentario.belongsTo(db.Usuario, {
            as:'usuario',
            foreignKey: 'usuario_id'
        });
    
    Comentario.belongsTo(db.Producto, {
        as:'producto',
        foreignKey: 'producto_id'
    });
}

    return Comentario;
}

