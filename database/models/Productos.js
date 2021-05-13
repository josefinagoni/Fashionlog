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
        estado: {
            type: dataTypes.STRING
            
        }
    }, {
        tableName: "productos",
        timestamps: false
    });

    return Producto;
}
