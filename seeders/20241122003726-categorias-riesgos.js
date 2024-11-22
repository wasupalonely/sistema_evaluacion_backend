"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const [tipoRiesgos] = await queryInterface.sequelize.query(
      `SELECT id FROM public."TipoEncuesta" WHERE nombre = 'Riesgos';`
    );

    const tipoEncuestaId = tipoRiesgos[0]?.id;
    if (!tipoEncuestaId) {
      throw new Error("Tipo de encuesta 'Riesgos' no encontrado.");
    }

    // Categorías de Riesgos
    const categoriasRiesgos = [
      {
        nombre: "Análisis",
        tipo_encuesta_id: tipoEncuestaId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Diseño",
        tipo_encuesta_id: tipoEncuestaId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Codificación",
        tipo_encuesta_id: tipoEncuestaId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Pruebas",
        tipo_encuesta_id: tipoEncuestaId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: "Entrega del producto",
        tipo_encuesta_id: tipoEncuestaId,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Categoria", categoriasRiesgos, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "Categoria",
      { modelo_calidad_id: null },
      {}
    );
  },
};
