"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Obtener IDs de categorías
    const categorias = await queryInterface.sequelize.query(
      `SELECT id, nombre FROM public."Categoria";`
    );
    const categoriaMap = Object.fromEntries(
      categorias[0].map((c) => [c.nombre, c.id])
    );

    const preguntas = [
      // FURPS - Funcionalidad
      {
        contenido:
          "¿El sistema cumple con todos los requerimientos funcionales?",
        categoria_id: categoriaMap["FuncionalidadFurps"],
      },
      {
        contenido:
          "¿Se manejan correctamente las excepciones en las funcionalidades principales?",
        categoria_id: categoriaMap["FuncionalidadFurps"],
      },
      {
        contenido: "¿Es posible realizar las tareas críticas sin problemas?",
        categoria_id: categoriaMap["FuncionalidadFurps"],
      },

      // FURPS - Usabilidad
      {
        contenido: "¿El sistema es fácil de usar?",
        categoria_id: categoriaMap["UsabilidadFurps"],
      },
      {
        contenido: "¿El sistema es intuitivo y facilidad de uso?",
        categoria_id: categoriaMap["UsabilidadFurps"],
      },
      {
        contenido: "¿Se proporciona ayuda clara para el usuario?",
        categoria_id: categoriaMap["UsabilidadFurps"],
      },

      // FURPS - Fiabilidad
      {
        contenido:
          "¿El sistema mantiene un comportamiento estable bajo carga normal?",
        categoria_id: categoriaMap["FiabilidadFurps"],
      },
      {
        contenido: "¿Se manejan correctamente los fallos inesperados?",
        categoria_id: categoriaMap["FiabilidadFurps"],
      },
      {
        contenido: "¿Es el tiempo de respuesta consistente?",
        categoria_id: categoriaMap["FiabilidadFurps"],
      },

      // FURPS - Portabilidad
      {
        contenido:
          "¿El sistema funciona correctamente en diferentes plataformas?",
        categoria_id: categoriaMap["PortabilidadFurps"],
      },
      {
        contenido: "¿Es fácil migrar los datos entre entornos?",
        categoria_id: categoriaMap["PortabilidadFurps"],
      },
      {
        contenido: "¿Se cumple con los estándares de interoperabilidad?",
        categoria_id: categoriaMap["PortabilidadFurps"],
      },

      // FURPS - Soportabilidad
      {
        contenido:
          "¿Es fácil modificar el sistema para añadir nuevas funcionalidades?",
        categoria_id: categoriaMap["SoportabilidadFurps"],
      },
      {
        contenido: "¿El sistema permite una depuración sencilla?",
        categoria_id: categoriaMap["SoportabilidadFurps"],
      },
      {
        contenido: "¿El mantenimiento del sistema es coste-efectivo?",
        categoria_id: categoriaMap["SoportabilidadFurps"],
      },
      

      // ISO25000
      // Funcionalidad
      {
        contenido: "¿Las funcionalidades cumplen con los estándares de la industria?",
        categoria_id: categoriaMap["FuncionalidadIso"],
      },
      {
        contenido: "¿El sistema responde correctamente a las entradas esperadas?",
        categoria_id: categoriaMap["FuncionalidadIso"],
      },
      {
        contenido: "¿Se han definido casos de uso completos para todas las funcionalidades?",
        categoria_id: categoriaMap["FuncionalidadIso"],
      },

      // Confiabilidad
      {
        contenido: "¿El sistema es confiable bajo cargas altas?",
        categoria_id: categoriaMap["ConfiabilidadIso"],
      },
      {
        contenido: "¿Se realiza un respaldo automático de los datos críticos?",
        categoria_id: categoriaMap["ConfiabilidadIso"],
      },
      {
        contenido: "¿Existen planes de recuperación ante fallos?",
        categoria_id: categoriaMap["ConfiabilidadIso"],
      },

      // Usabilidad
      {
        contenido: "¿El sistema incluye guías y manuales accesibles?",
        categoria_id: categoriaMap["UsabilidadIso"],
      },
      {
        contenido: "¿Se puede personalizar la interfaz de acuerdo con las necesidades del usuario?",
        categoria_id: categoriaMap["UsabilidadIso"],
      },
      {
        contenido: "¿La curva de aprendizaje es adecuada para nuevos usuarios?",
        categoria_id: categoriaMap["UsabilidadIso"],
      },

      // Eficiencia
      {
        contenido: "¿El tiempo de respuesta es adecuado para todas las funcionalidades?",
        categoria_id: categoriaMap["EficienciaIso"],
      },
      {
        contenido: "¿El uso de recursos del sistema está optimizado?",
        categoria_id: categoriaMap["EficienciaIso"],
      },
      {
        contenido: "¿El rendimiento se degrada de manera gradual bajo estrés?",
        categoria_id: categoriaMap["EficienciaIso"],
      },

      // Mantenibilidad
      {
        contenido: "¿El código fuente está documentado adecuadamente?",
        categoria_id: categoriaMap["MantenibilidadIso"],
      },
      {
        contenido: "¿Los cambios menores pueden ser implementados sin afectar la estabilidad del sistema?",
        categoria_id: categoriaMap["MantenibilidadIso"],
      },
      {
        contenido: "¿Existen procedimientos definidos para pruebas de regresión?",
        categoria_id: categoriaMap["MantenibilidadIso"],
      },

      // Six Sigma
      // Variabilidad
      {
        contenido: "¿Existen métricas definidas para medir la variabilidad de los procesos?",
        categoria_id: categoriaMap["VariabilidadSix"],
      },
      {
        contenido: "¿El sistema minimiza las discrepancias en los resultados?",
        categoria_id: categoriaMap["VariabilidadSix"],
      },
      {
        contenido: "¿Se pueden identificar fácilmente las causas de variabilidad?",
        categoria_id: categoriaMap["VariabilidadSix"],
      },

      // Eficiencia
      {
        contenido: "¿El sistema utiliza los recursos de manera óptima?",
        categoria_id: categoriaMap["EficienciaSix"],
      },
      {
        contenido: "¿Se alcanzan los resultados esperados dentro del tiempo planificado?",
        categoria_id: categoriaMap["EficienciaSix"],
      },
      {
        contenido: "¿Se reducen los tiempos muertos o de espera?",
        categoria_id: categoriaMap["EficienciaSix"],
      },

      // Calidad
      {
        contenido: "¿El sistema produce resultados libres de errores?",
        categoria_id: categoriaMap["CalidadSix"],
      },
      {
        contenido: "¿El cumplimiento de los estándares de calidad es verificable?",
        categoria_id: categoriaMap["CalidadSix"],
      },
      {
        contenido: "¿Se realizan inspecciones regulares para garantizar la calidad?",
        categoria_id: categoriaMap["CalidadSix"],
      },

      // Boehm
      // Costo
      {
        contenido: "¿El costo de desarrollo se ajusta al presupuesto inicial?",
        categoria_id: categoriaMap["CostoBoehm"],
      },
      {
        contenido: "¿Se optimizan los costos sin comprometer la calidad?",
        categoria_id: categoriaMap["CostoBoehm"],
      },
      {
        contenido: "¿El costo de mantenimiento es aceptable?",
        categoria_id: categoriaMap["CostoBoehm"],
      },

      // Eficiencia
      {
        contenido: "¿El sistema cumple con los objetivos de rendimiento establecidos?",
        categoria_id: categoriaMap["EficienciaBoehm"],
      },
      {
        contenido: "¿Las herramientas utilizadas son las más adecuadas para el desarrollo?",
        categoria_id: categoriaMap["EficienciaBoehm"],
      },
      {
        contenido: "¿El desarrollo del sistema sigue buenas prácticas?",
        categoria_id: categoriaMap["EficienciaBoehm"],
      },

      // Planificación
      {
        contenido: "¿Se cumplen las fechas de entrega?",
        categoria_id: categoriaMap["PlanificacionBoehm"],
      },
      {
        contenido: "¿Existen métricas claras para medir el progreso del proyecto?",
        categoria_id: categoriaMap["PlanificacionBoehm"], 
      },
      {
        contenido: "¿Los hitos definidos son alcanzables?",
        categoria_id: categoriaMap["PlanificacionBoehm"],
      }

    ];

    const preguntasWithTimestamps = preguntas.map((preg) => ({
      ...preg,
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await queryInterface.bulkInsert("Pregunta", preguntasWithTimestamps, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Pregunta", null, {});
  },
};
