'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Permisos', [
      {
        nombre: 'Crear usuarios',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Editar usuarios',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Eliminar usuarios',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        nombre: 'Visualizar usuarios',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Permisos', null, {});
  },
};
