"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RolPermiso extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  RolPermiso.init(
    {
      rol_id: DataTypes.INTEGER,
      permiso_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "RolPermiso",
      timestamps: true, // Activa createdAt y updatedAt
      createdAt: "createdAt", // Sequelize agregará esta columna automáticamente
      updatedAt: "updatedAt", // Sequelize agregará esta columna automáticamente
    }
  );
  return RolPermiso;
};
