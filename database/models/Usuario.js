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
        contrasena: {
            type: dataTypes.STRING
            
        },
        dni: {
            type: dataTypes.INTEGER
            
        },
        imagen: {
            type: dataTypes.STRING
        },
        createdAt:{
            type: dataTypes.DATE
        },
        updatedAt: {
            type: dataTypes.DATE
        }
        
            
        
    }, {
        tableName: "usuarios",
        
    });

    Usuario.associate = (db) =>{
        Usuario.hasMany(db.Producto, {
           as: 'productos',
           foreignKey: 'usuario_id' });

  
        Usuario.hasMany(db.Comentario, {
           as: 'comentario',
           foreignKey: 'usuario_id' });
    }
    return Usuario;
};
