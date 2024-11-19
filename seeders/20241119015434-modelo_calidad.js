'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener el ID del tipo de encuesta 'Calidad'
    const [tipoCalidad] = await queryInterface.sequelize.query(
      `SELECT id FROM public."TipoEncuesta" WHERE nombre = 'Calidad';`
    );

    await queryInterface.bulkInsert(
      "ModeloCalidads",
      [
        { nombre: "FURPS", tipo_encuesta_id: tipoCalidad[0].id, createdAt: new Date(), updatedAt: new Date() },
        { nombre: "ISO25000", tipo_encuesta_id: tipoCalidad[0].id, createdAt: new Date(), updatedAt: new Date() },
        { nombre: "Six Sigma", tipo_encuesta_id: tipoCalidad[0].id, createdAt: new Date(), updatedAt: new Date() },
        { nombre: "Boehm", tipo_encuesta_id: tipoCalidad[0].id, createdAt: new Date(), updatedAt: new Date() },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ModeloCalidads", null, {});
  },
};
