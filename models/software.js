"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Software extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Software.belongsTo(models.Empresa, {
        foreignKey: "empresa_id",
        as: "empresa",
      });

      Software.hasMany(models.Encuesta, {
        foreignKey: "software_id",
        as: "encuestas",
      });
    }
  }
  Software.init(
    {
      nombre: DataTypes.STRING,
      empresa_id: DataTypes.INTEGER,
      creador_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Software",
      timestamps: true, // Activa createdAt y updatedAt
      createdAt: 'createdAt', // Sequelize agregará esta columna automáticamente
      updatedAt: 'updatedAt', // Sequelize agregará esta columna automáticamente
    }
  );
  return Software;
};
