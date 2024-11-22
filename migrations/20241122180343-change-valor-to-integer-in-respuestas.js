"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Paso 1: Crear una columna temporal `valor_temp` como INTEGER
    await queryInterface.addColumn("Respuesta", "valor_temp", {
      type: Sequelize.INTEGER,
      allowNull: true, // Temporalmente permitimos nulos
    });

    // Paso 2: Copiar datos válidos de `valor` a `valor_temp`
    await queryInterface.sequelize.query(`
      UPDATE "Respuesta"
      SET "valor_temp" = CAST("valor" AS INTEGER)
      WHERE "valor" ~ '^[0-9]+$'; -- Solo números válidos
    `);

    // Paso 3: Eliminar la columna original `valor`
    await queryInterface.removeColumn("Respuesta", "valor");

    // Paso 4: Renombrar `valor_temp` a `valor`
    await queryInterface.renameColumn("Respuesta", "valor_temp", "valor");

    // Paso 5: Aplicar restricciones finales al nuevo `valor`
    await queryInterface.changeColumn("Respuesta", "valor", {
      type: Sequelize.INTEGER,
      allowNull: false, // Ahora no permitimos valores nulos
    });
  },

  async down(queryInterface, Sequelize) {
    // Revertir el cambio volviendo a STRING
    await queryInterface.addColumn("Respuesta", "valor_temp", {
      type: Sequelize.STRING,
      allowNull: true,
    });

    await queryInterface.sequelize.query(`
      UPDATE "Respuesta"
      SET "valor_temp" = CAST("valor" AS TEXT);
    `);

    await queryInterface.removeColumn("Respuesta", "valor");
    await queryInterface.renameColumn("Respuesta", "valor_temp", "valor");
  },
};
