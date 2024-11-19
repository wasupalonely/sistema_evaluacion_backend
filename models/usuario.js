'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Relación 1:N con Rol (Un usuario pertenece a un rol)
      Usuario.belongsTo(models.Rol, {
        foreignKey: 'rol_id',
        as: 'rol' // Alias para acceder a la relación
      });

      // Relación 1:N con Empresa (Un usuario puede pertenecer a una empresa)
      Usuario.belongsTo(models.Empresa, {
        foreignKey: 'empresa_id',
        as: 'empresa' // Alias para acceder a la relación
      });

      // Si tienes relaciones adicionales, agrégalas aquí
    }
  }

  Usuario.init(
    {
      nombre: DataTypes.STRING,
      correo: {
        type: DataTypes.STRING,
        allowNull: false, // No puede ser nulo
        unique: true, // Debe ser único
        validate: {
          isEmail: true, // Valida que sea un correo
        },
      },
      contrasena: {
        type: DataTypes.STRING,
        allowNull: false, // No puede ser nulo
        validate: {
          len: [6, 100], // La contraseña debe tener entre 6 y 100 caracteres
        },
      },
      rol_id: DataTypes.INTEGER,
      empresa_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Usuario',
      tableName: 'Usuarios', // Nombre de la tabla en plural (opcional)
      timestamps: true, // Activa createdAt y updatedAt
      createdAt: 'createdAt', // Sequelize agregará esta columna automáticamente
      updatedAt: 'updatedAt', // Sequelize agregará esta columna automáticamente
    }
  );

  return Usuario;
};
