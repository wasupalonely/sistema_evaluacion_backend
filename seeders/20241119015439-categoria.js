'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener IDs de modelos de calidad
    const modelos = await queryInterface.sequelize.query(
      `SELECT id, nombre FROM public."ModeloCalidads";`
    );
    const modeloMap = Object.fromEntries(
      modelos[0].map((m) => [m.nombre, m.id])
    );

    const categorias = [
      // Categorías de FURPS
      { nombre: "FuncionalidadFurps", modelo_calidad_id: modeloMap["FURPS"] },
      { nombre: "UsabilidadFurps", modelo_calidad_id: modeloMap["FURPS"] },
      { nombre: "FiabilidadFurps", modelo_calidad_id: modeloMap["FURPS"] },
      { nombre: "PortabilidadFurps", modelo_calidad_id: modeloMap["FURPS"] },
      { nombre: "SoportabilidadFurps", modelo_calidad_id: modeloMap["FURPS"] },

      // Categorías de ISO25000
      { nombre: "FuncionalidadIso", modelo_calidad_id: modeloMap["ISO25000"] },
      { nombre: "ConfiabilidadIso", modelo_calidad_id: modeloMap["ISO25000"] },
      { nombre: "UsabilidadIso", modelo_calidad_id: modeloMap["ISO25000"] },
      { nombre: "EficienciaIso", modelo_calidad_id: modeloMap["ISO25000"] },
      { nombre: "MantenibilidadIso", modelo_calidad_id: modeloMap["ISO25000"] },

      // Categorías de Six Sigma
      { nombre: "VariabilidadSix", modelo_calidad_id: modeloMap["Six Sigma"] },
      { nombre: "EficienciaSix", modelo_calidad_id: modeloMap["Six Sigma"] },
      { nombre: "CalidadSix", modelo_calidad_id: modeloMap["Six Sigma"] },

      // Categorías de Boehm
      { nombre: "CostoBoehm", modelo_calidad_id: modeloMap["Boehm"] },
      { nombre: "PlanificacionBoehm", modelo_calidad_id: modeloMap["Boehm"] },
      { nombre: "EficienciaBoehm", modelo_calidad_id: modeloMap["Boehm"] },
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
