// /seeders/20241118000700-preguntas_riesgos.js
"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener categorías de riesgos
    const categorias = await queryInterface.sequelize.query(
      `SELECT id, nombre FROM public."Categoria" WHERE tipo_encuesta_id IS NOT NULL;`
    );

    const categoriaMap = Object.fromEntries(
      categorias[0].map((categoria) => [categoria.nombre, categoria.id])
    );

    const preguntasRiesgos = [
      // Análisis
      {
        impacto: JSON.stringify({
          alcance: 4,
          tiempo: 5,
          costo: 5,
          calidad: 5,
        }),
        contenido: "Requerimientos incompletos o ambiguos.",
        categoria_id: categoriaMap["Análisis"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 5,
          tiempo: 4,
          costo: 5,
          calidad: 4,
        }),
        contenido:
          "Falta de acompañamiento de los usuarios en el levantamiento de requerimientos.",
        categoria_id: categoriaMap["Análisis"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 3,
          tiempo: 4,
          costo: 4,
          calidad: 3,
        }),
        contenido: "Retrasos en la especificacion de requerimientos.",
        categoria_id: categoriaMap["Análisis"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 4,
          tiempo: 4,
          costo: 4,
          calidad: 3,
        }),
        contenido: "Incorporación continua de nuevos requerimientos.",
        categoria_id: categoriaMap["Análisis"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 3,
          tiempo: 3,
          costo: 3,
          calidad: 3,
        }),
        contenido: "Modificacion continua de requerimientos.",
        categoria_id: categoriaMap["Análisis"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 4,
          tiempo: 4,
          costo: 4,
          calidad: 4,
        }),
        contenido: "Modificaciones incorrectas de las especificaciones",
        categoria_id: categoriaMap["Análisis"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 4,
          tiempo: 4,
          costo: 4,
          calidad: 4,
        }),
        contenido: "Entendimiento errado de los requerimientos",
        categoria_id: categoriaMap["Análisis"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Diseño
      {
        impacto: JSON.stringify({
          alcance: 3,
          tiempo: 3,
          costo: 3,
          calidad: 3,
        }),
        contenido:
          "Incorrecta definicion y estructuracion de los datos establecidos.",
        categoria_id: categoriaMap["Diseño"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 4,
          tiempo: 4,
          costo: 4,
          calidad: 3,
        }),
        contenido: "Diseño de interfaces incompleto",
        categoria_id: categoriaMap["Diseño"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 4,
          tiempo: 4,
          costo: 5,
          calidad: 3,
        }),
        contenido: "Subestimacion del tamaño de la aplicación.",
        categoria_id: categoriaMap["Diseño"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 4,
          tiempo: 5,
          costo: 5,
          calidad: 4,
        }),
        contenido: "Falta de Especificación de la arquitectura logica",
        categoria_id: categoriaMap["Diseño"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 4,
          tiempo: 4,
          costo: 5,
          calidad: 4,
        }),
        contenido: "Falta de Especificación de la arquitectura fisica",
        categoria_id: categoriaMap["Diseño"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 5,
          tiempo: 4,
          costo: 5,
          calidad: 4,
        }),
        contenido: "Desconocimiento de la logica de negocio",
        categoria_id: categoriaMap["Diseño"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Codificación
      {
        impacto: JSON.stringify({
          alcance: 3,
          tiempo: 4,
          costo: 3,
          calidad: 4,
        }),
        contenido: "Bajo rendimiento de la herramienta CASE",
        categoria_id: categoriaMap["Codificación"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 3,
          tiempo: 4,
          costo: 4,
          calidad: 3,
        }),
        contenido: "Manejo inadecuado en liberacion de versiones",
        categoria_id: categoriaMap["Codificación"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 2,
          tiempo: 3,
          costo: 2,
          calidad: 3,
        }),
        contenido: "Falta de documentacion en codigo fuente",
        categoria_id: categoriaMap["Codificación"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 3,
          tiempo: 4,
          costo: 4,
          calidad: 3,
        }),
        contenido: "Modificacion cronograma actividades",
        categoria_id: categoriaMap["Codificación"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 5,
          tiempo: 5,
          costo: 4,
          calidad: 4,
        }),
        contenido: "No disponibilidad de hardware y/o software.",
        categoria_id: categoriaMap["Codificación"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 4,
          tiempo: 4,
          costo: 4,
          calidad: 4,
        }),
        contenido: "El Software es complejo de implementar",
        categoria_id: categoriaMap["Codificación"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 4,
          tiempo: 5,
          costo: 5,
          calidad: 4,
        }),
        contenido: "Compleja la integración de módulos del software",
        categoria_id: categoriaMap["Codificación"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 3,
          tiempo: 3,
          costo: 3,
          calidad: 3,
        }),
        contenido: "Retiro de personal con conocimiento y experiencia",
        categoria_id: categoriaMap["Codificación"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 4,
          tiempo: 4,
          costo: 4,
          calidad: 4,
        }),
        contenido: "No hay buena comunicación y/o sinergia en el equipo.",
        categoria_id: categoriaMap["Codificación"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 4,
          tiempo: 4,
          costo: 4,
          calidad: 4,
        }),
        contenido:
          "Falta de conocimiento y Experiencia sobre las tareas asignadas y las herramientas a utilizar.",
        categoria_id: categoriaMap["Codificación"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 3,
          tiempo: 4,
          costo: 4,
          calidad: 3,
        }),
        contenido: "Pérdida de backups",
        categoria_id: categoriaMap["Codificación"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Pruebas
      {
        impacto: JSON.stringify({
          alcance: 4,
          tiempo: 5,
          costo: 5,
          calidad: 5,
        }),
        contenido: "Alcance de las pruebas No definido completamente.",
        categoria_id: categoriaMap["Pruebas"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 5,
          tiempo: 5,
          costo: 5,
          calidad: 5,
        }),
        contenido:
          "Documentación de requisitos insuficiente, desactualizada, contradictoria o ambigua.",
        categoria_id: categoriaMap["Pruebas"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 4,
          tiempo: 4,
          costo: 5,
          calidad: 5,
        }),
        contenido: "Realizar pruebas en ambiente desarrollo",
        categoria_id: categoriaMap["Pruebas"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 4,
          tiempo: 4,
          costo: 4,
          calidad: 4,
        }),
        contenido: "No se realiza completitud en las pruebas.",
        categoria_id: categoriaMap["Pruebas"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 4,
          tiempo: 4,
          costo: 4,
          calidad: 4,
        }),
        contenido: "No se realiza priorizacion en las ejecucion de las pruebas",
        categoria_id: categoriaMap["Pruebas"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 3,
          tiempo: 4,
          costo: 4,
          calidad: 3,
        }),
        contenido:
          "Demoras excesivas en la reparación de defectos encontrados en las pruebas",
        categoria_id: categoriaMap["Pruebas"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 4,
          tiempo: 4,
          costo: 4,
          calidad: 4,
        }),
        contenido: "Problemas de disponibilidad con el ambiente de pruebas.",
        categoria_id: categoriaMap["Pruebas"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 4,
          tiempo: 4,
          costo: 4,
          calidad: 4,
        }),
        contenido:
          "Retraso Testing debido a nuevos errores despues de despliegues",
        categoria_id: categoriaMap["Pruebas"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 2,
          tiempo: 3,
          costo: 2,
          calidad: 2,
        }),
        contenido: "Pobre Productividad",
        categoria_id: categoriaMap["Pruebas"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 4,
          tiempo: 4,
          costo: 4,
          calidad: 4,
        }),
        contenido: "No hay suficientes recursos y/o ingresan demasiado tarde",
        categoria_id: categoriaMap["Pruebas"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Entrega del producto
      {
        impacto: JSON.stringify({
          alcance: 4,
          tiempo: 4,
          costo: 4,
          calidad: 4,
        }),
        contenido: "Capacitacion superficial a usuarios finales",
        categoria_id: categoriaMap["Entrega del producto"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 4,
          tiempo: 4,
          costo: 4,
          calidad: 4,
        }),
        contenido:
          "La aplicacion no procesa transacciones por segundo como se esperaba.",
        categoria_id: categoriaMap["Entrega del producto"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 4,
          tiempo: 4,
          costo: 4,
          calidad: 4,
        }),
        contenido: "Fallas del hardware limitan la funcionalidad del software",
        categoria_id: categoriaMap["Entrega del producto"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 4,
          tiempo: 4,
          costo: 4,
          calidad: 4,
        }),
        contenido: "Arquitectura inadecuada por parte del cliente",
        categoria_id: categoriaMap["Entrega del producto"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 2,
          tiempo: 3,
          costo: 2,
          calidad: 3,
        }),
        contenido: "Documentacion sobre el uso de la aplicación.",
        categoria_id: categoriaMap["Entrega del producto"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 3,
          tiempo: 3,
          costo: 5,
          calidad: 5,
        }),
        contenido: "Vulnerabilidades del software presentadas en produccion.",
        categoria_id: categoriaMap["Entrega del producto"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 2,
          tiempo: 3,
          costo: 2,
          calidad: 2,
        }),
        contenido:
          "Resistencia del personal para cambiar las prácticas del pasado",
        categoria_id: categoriaMap["Entrega del producto"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 3,
          tiempo: 3,
          costo: 5,
          calidad: 5,
        }),
        contenido:
          "Software contiene numerosos errores cuando se entrega al cliente.",
        categoria_id: categoriaMap["Entrega del producto"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        impacto: JSON.stringify({
          alcance: 4,
          tiempo: 4,
          costo: 5,
          calidad: 5,
        }),
        contenido: "Presentacion de defectos en ambiente produccion.",
        categoria_id: categoriaMap["Entrega del producto"],
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert("Pregunta", preguntasRiesgos, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Pregunta", { categoria_id: null }, {});
  },
};
