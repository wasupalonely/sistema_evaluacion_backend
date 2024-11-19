"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rol.hasMany(models.Usuario, {
        foreignKey: "rol_id",
        as: "usuarios",
      });

      Rol.belongsToMany(models.Permiso, {
        through: models.RolPermiso,
        foreignKey: "rol_id",
        as: "permisos",
      });
    }
  }
  Rol.init(
    {
      nombre: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Rol",
      timestamps: true, // Activa createdAt y updatedAt
      tableName: "Roles",
      createdAt: "createdAt", // Sequelize agregará esta columna automáticamente
      updatedAt: "updatedAt", // Sequelize agregará esta columna automáticamente
    }
  );
  return Rol;
};
