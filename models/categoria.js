"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Categoria.belongsTo(models.ModeloCalidad, {
        foreignKey: "modelo_calidad_id",
        as: "modelo_calidad",
      });

      Categoria.hasMany(models.Pregunta, {
        foreignKey: "categoria_id",
        as: "preguntas",
      });
    }
  }
  Categoria.init(
    {
      nombre: DataTypes.STRING,
      modelo_calidad_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Categoria",
      timestamps: true, // Activa createdAt y updatedAt
      createdAt: "createdAt", // Sequelize agregará esta columna automáticamente
      updatedAt: "updatedAt", // Sequelize agregará esta columna automáticamente
    }
  );
  return Categoria;
};
