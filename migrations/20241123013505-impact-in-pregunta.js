"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Pregunta", "impacto", {
      type: Sequelize.JSON,
      allowNull: true, // Nullable porque no todas las preguntas lo necesitan
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Pregunta", "impacto");
  },
};
