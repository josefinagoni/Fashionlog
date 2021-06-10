module.exports = (sequelize, dataTypes) => {

    const Producto = sequelize.define('Producto', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: dataTypes.INTEGER
        },
        nombre: {
            type: dataTypes.STRING
        },
        //imagen: {
            //dataTypes: STRING
           
       // },
       descripcion: {
           type: dataTypes.STRING
       },
        usuario_id: {
            type: dataTypes.INTEGER
        },

        createdAt: {
            type: dataTypes.DATE
        } ,
        updatedAt: {
            type: dataTypes.DATE
        }
    }, {
        tableName: "productos",
        timestamps: false
    });

    Producto.asociate = (db)  => {
        Producto.belongsTo(db.Usuario, {
            as:'usuario',
            foreignKey: 'usuario_id'
        });
    
    Producto.hasMany(db.Comentario, {
        as:'comentario',
        foreignKey: 'producto_id'
    });
}
    return Producto;
}
