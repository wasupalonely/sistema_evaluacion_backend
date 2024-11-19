"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Respuesta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Respuesta.belongsTo(models.Encuesta, {
        foreignKey: "encuesta_id",
        as: "encuesta",
      });

      Respuesta.belongsTo(models.Pregunta, {
        foreignKey: "pregunta_id",
        as: "pregunta",
      });

      Respuesta.belongsTo(models.Usuario, {
        foreignKey: "usuario_id",
        as: "usuario",
      });
    }
  }
  Respuesta.init(
    {
      encuesta_id: DataTypes.INTEGER,
      pregunta_id: DataTypes.INTEGER,
      usuario_id: DataTypes.INTEGER,
      valor: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Respuesta",
      timestamps: true, // Activa createdAt y updatedAt
      createdAt: 'createdAt', // Sequelize agregará esta columna automáticamente
      updatedAt: 'updatedAt', // Sequelize agregará esta columna automáticamente
    }
  );
  return Respuesta;
};
