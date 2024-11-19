"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const roles = await queryInterface.sequelize.query(
      `SELECT id, nombre FROM public."Roles";`
    );
    const permisos = await queryInterface.sequelize.query(
      `SELECT id FROM public."Permisos";`
    );

    const rolAdmin = roles[0].find((role) => role.nombre === "Administrador");
    if (!rolAdmin) {
      throw new Error(
        'No se encontró el rol "Administrador". Asegúrate de que el seeder de roles se ejecutó correctamente.'
      );
    }

    const rolPermisos = permisos[0].map((permiso) => ({
      rol_id: rolAdmin.id,
      permiso_id: permiso.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("RolPermisos", rolPermisos, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("RolPermisos", null, {});
  },
};
