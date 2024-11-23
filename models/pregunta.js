"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Pregunta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pregunta.belongsTo(models.Categoria, {
        foreignKey: "categoria_id",
        as: "categoria",
      });

      Pregunta.hasMany(models.Respuesta, {
        foreignKey: "pregunta_id",
        as: "respuestas",
      });
    }
  }
  Pregunta.init(
    {
      contenido: DataTypes.TEXT,
      categoria_id: DataTypes.INTEGER,
      impacto: {
        type: DataTypes.JSON,
        allowNull: true,
        get() {
          const rawValue = this.getDataValue("impacto");
          return typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue;
        },
        set(value) {
          this.setDataValue("impacto", JSON.stringify(value));
        },
      },
    },
    {
      sequelize,
      modelName: "Pregunta",
      timestamps: true, // Activa createdAt y updatedAt
      createdAt: "createdAt", // Sequelize agregará esta columna automáticamente
      updatedAt: "updatedAt", // Sequelize agregará esta columna automáticamente
    }
  );
  return Pregunta;
};
