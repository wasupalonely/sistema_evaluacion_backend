"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Agregar la columna tipo_encuesta_id
    await queryInterface.addColumn("Categoria", "tipo_encuesta_id", {
      type: Sequelize.INTEGER,
      allowNull: true, // Puede ser nulo si pertenece a un modelo de calidad
      references: {
        model: "TipoEncuesta",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    // Modificar modelo_calidad_id para que sea nullable
    await queryInterface.changeColumn("Categoria", "modelo_calidad_id", {
      type: Sequelize.INTEGER,
      allowNull: true, // Ahora puede ser nulo
      references: {
        model: "ModeloCalidads",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    // Revertir modelo_calidad_id a no nulo
    await queryInterface.changeColumn("Categoria", "modelo_calidad_id", {
      type: Sequelize.INTEGER,
      allowNull: false, // Revertir a no nulo
      references: {
        model: "ModeloCalidads",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    // Eliminar la columna tipo_encuesta_id
    await queryInterface.removeColumn("Categoria", "tipo_encuesta_id");
  },
};
