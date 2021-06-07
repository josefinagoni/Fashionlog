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
            
        },
            estado: {
            type: dataTypes.STRING
            
        }
    }, {
        tableName: "usuarios",
        timestamps: false
    });

    Usuario.associate = (db) =>{
        Usuario.hasMany(db.Producto, {
           as: 'productos',
           foreignKey: 'usuario_id' });
    };

    Usuario.associate = (db) =>{
        Usuario.hasMany(db.Comentario, {
           as: 'comentarios',
           foreignKey: 'usuario_id' });
    };
    return Usuario;
};
