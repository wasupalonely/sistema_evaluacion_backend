"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener IDs de modelos de calidad
    const modelos = await queryInterface.sequelize.query(
      `SELECT id, nombre FROM public."ModeloCalidads";`
    );
    const modeloMap = Object.fromEntries(
      modelos[0].map((m) => [m.nombre, m.id])
    );

    const [tipoCalidad] = await queryInterface.sequelize.query(
      `SELECT id FROM public."TipoEncuesta" WHERE nombre = 'Calidad';`
    );

    const tipoEncuestaId = tipoCalidad[0]?.id;
    if (!tipoEncuestaId) {
      throw new Error("Tipo de encuesta 'Riesgos' no encontrado.");
    }

    const categorias = [
      // Categorías de FURPS
      {
        nombre: "FuncionalidadFurps",
        modelo_calidad_id: modeloMap["FURPS"],
        tipo_encuesta_id: tipoEncuestaId,
      },
      {
        nombre: "UsabilidadFurps",
        modelo_calidad_id: modeloMap["FURPS"],
        tipo_encuesta_id: tipoEncuestaId,
      },
      {
        nombre: "FiabilidadFurps",
        modelo_calidad_id: modeloMap["FURPS"],
        tipo_encuesta_id: tipoEncuestaId,
      },
      {
        nombre: "PortabilidadFurps",
        modelo_calidad_id: modeloMap["FURPS"],
        tipo_encuesta_id: tipoEncuestaId,
      },
      {
        nombre: "SoportabilidadFurps",
        modelo_calidad_id: modeloMap["FURPS"],
        tipo_encuesta_id: tipoEncuestaId,
      },

      // Categorías de ISO25000
      {
        nombre: "FuncionalidadIso",
        modelo_calidad_id: modeloMap["ISO25000"],
        tipo_encuesta_id: tipoEncuestaId,
      },
      {
        nombre: "ConfiabilidadIso",
        modelo_calidad_id: modeloMap["ISO25000"],
        tipo_encuesta_id: tipoEncuestaId,
      },
      {
        nombre: "UsabilidadIso",
        modelo_calidad_id: modeloMap["ISO25000"],
        tipo_encuesta_id: tipoEncuestaId,
      },
      {
        nombre: "EficienciaIso",
        modelo_calidad_id: modeloMap["ISO25000"],
        tipo_encuesta_id: tipoEncuestaId,
      },
      {
        nombre: "MantenibilidadIso",
        modelo_calidad_id: modeloMap["ISO25000"],
        tipo_encuesta_id: tipoEncuestaId,
      },

      // Categorías de Six Sigma
      {
        nombre: "VariabilidadSix",
        modelo_calidad_id: modeloMap["Six Sigma"],
        tipo_encuesta_id: tipoEncuestaId,
      },
      {
        nombre: "EficienciaSix",
        modelo_calidad_id: modeloMap["Six Sigma"],
        tipo_encuesta_id: tipoEncuestaId,
      },
      {
        nombre: "CalidadSix",
        modelo_calidad_id: modeloMap["Six Sigma"],
        tipo_encuesta_id: tipoEncuestaId,
      },

      // Categorías de Boehm
      {
        nombre: "CostoBoehm",
        modelo_calidad_id: modeloMap["Boehm"],
        tipo_encuesta_id: tipoEncuestaId,
      },
      {
        nombre: "PlanificacionBoehm",
        modelo_calidad_id: modeloMap["Boehm"],
        tipo_encuesta_id: tipoEncuestaId,
      },
      {
        nombre: "EficienciaBoehm",
        modelo_calidad_id: modeloMap["Boehm"],
        tipo_encuesta_id: tipoEncuestaId,
      },
    ];

    // Agregar timestamps a las categorías
    const categoriasWithTimestamps = categorias.map((cat) => ({
      ...cat,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("Categoria", categoriasWithTimestamps, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categoria", null, {});
  },
};
