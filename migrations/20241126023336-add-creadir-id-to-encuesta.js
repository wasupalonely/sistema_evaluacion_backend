module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("Encuesta", {
      fields: ["creador_id"], // Columna que se relacionará
      type: "foreign key",
      name: "FK_creador_id_usuario", // Nombre único de la clave foránea
      references: {
        table: "Usuarios", // Tabla de destino
        field: "id", // Campo de destino
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL", // Opcional: elimina la relación si el usuario se borra
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Encuesta", "FK_creador_id_usuario");
  },
};
