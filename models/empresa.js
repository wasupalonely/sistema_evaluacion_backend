"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Empresa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Empresa.hasMany(models.Usuario, {
        foreignKey: "empresa_id",
        as: "usuarios",
      });

      Empresa.hasMany(models.Software, {
        foreignKey: "empresa_id",
        as: "softwares",
      });
    }
  }
  Empresa.init(
    {
      nombre: DataTypes.STRING,
      admin_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Empresa",
      timestamps: true, // Activa createdAt y updatedAt
      createdAt: 'createdAt', // Sequelize agregará esta columna automáticamente
      updatedAt: 'updatedAt', // Sequelize agregará esta columna automáticamente
    }
  );
  return Empresa;
};
