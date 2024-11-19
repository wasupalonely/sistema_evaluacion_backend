'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "TipoEncuesta",
      [
        { nombre: "Calidad", createdAt: new Date(), updatedAt: new Date() },
        { nombre: "Riesgos", createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("TipoEncuesta", null, {});
  },
};
