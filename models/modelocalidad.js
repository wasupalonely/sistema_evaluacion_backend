"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ModeloCalidad extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ModeloCalidad.belongsTo(models.TipoEncuesta, {
        foreignKey: "tipo_encuesta_id",
        as: "tipo_encuesta",
      });

      ModeloCalidad.hasMany(models.Categoria, {
        foreignKey: "modelo_calidad_id",
        as: "categorias",
      });
    }
  }
  ModeloCalidad.init(
    {
      nombre: DataTypes.STRING,
      tipo_encuesta_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ModeloCalidad",
      timestamps: true, // Activa createdAt y updatedAt
      createdAt: "createdAt", // Sequelize agregará esta columna automáticamente
      updatedAt: "updatedAt", // Sequelize agregará esta columna automáticamente
    }
  );
  return ModeloCalidad;
};
