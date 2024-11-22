"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Encuesta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Encuesta.belongsTo(models.TipoEncuesta, {
        foreignKey: "tipo_encuesta_id",
        as: "tipo_encuesta",
      });

      Encuesta.belongsTo(models.ModeloCalidad, {
        foreignKey: "modelo_calidad_id",
        as: "modelo_calidad",
      });

      Encuesta.belongsTo(models.Software, {
        foreignKey: "software_id",
        as: "software",
      });

      Encuesta.hasMany(models.Respuesta, {
        foreignKey: "encuesta_id",
        as: "respuestas",
        onDelete: 'CASCADE',
      });
    }
  }
  Encuesta.init(
    {
      tipo_encuesta_id: DataTypes.INTEGER,
      modelo_calidad_id: DataTypes.INTEGER,
      software_id: DataTypes.INTEGER,
      creador_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Encuesta",
      timestamps: true, // Activa createdAt y updatedAt
      createdAt: 'createdAt', // Sequelize agregará esta columna automáticamente
      updatedAt: 'updatedAt', // Sequelize agregará esta columna automáticamente
    }
  );
  return Encuesta;
};
