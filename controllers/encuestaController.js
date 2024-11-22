const {
  ModeloCalidad,
  Categoria,
  Pregunta,
  Encuesta,
  TipoEncuesta,
  Software,
  Respuesta,
  Usuario,
  Sequelize,
} = require("../models");

exports.getQualityModelById = async (req, res) => {
  const { modeloId } = req.params;

  try {
    const qualityModel = await ModeloCalidad.findOne({
      where: { id: modeloId },
      include: {
        model: Categoria,
        as: "categorias",
        include: {
          model: Pregunta,
          as: "preguntas",
        },
      },
    });

    if (!qualityModel) {
      return res
        .status(404)
        .json({ message: "Modelo de calidad no encontrado" });
    }

    const evaluacion = {
      id: qualityModel.id,
      nombre: qualityModel.nombre,
      categorias: qualityModel.categorias.map((categoria) => ({
        id: categoria.id,
        nombre: categoria.nombre,
        preguntas: categoria.preguntas.map((pregunta) => ({
          id: pregunta.id,
          contenido: pregunta.contenido,
        })),
      })),
    };

    res.status(200).json(evaluacion);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.createQuestionary = async (req, res) => {
  const { modeloCalidadId, softwareId, creadorId } = req.body;

  try {
    const tipoEncuesta = await TipoEncuesta.findOne({
      where: { nombre: "Calidad" },
    });

    if (!tipoEncuesta) {
      return res.status(404).json({ error: "Tipo de encuesta no encontrado." });
    }

    const modelo = await ModeloCalidad.findByPk(modeloCalidadId);
    if (!modelo) {
      return res
        .status(404)
        .json({ error: "Modelo de calidad no encontrado." });
    }

    const software = await Software.findByPk(softwareId);
    if (!software) {
      return res.status(404).json({ error: "Software no encontrado." });
    }

    // Crear la encuesta
    const encuesta = await Encuesta.create({
      tipo_encuesta_id: tipoEncuesta.id,
      modelo_calidad_id: modeloCalidadId,
      software_id: softwareId,
      creador_id: creadorId,
    });

    res.status(201).json({
      encuestaId: encuesta.id,
      message: "Encuesta creada exitosamente.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la encuesta." });
  }
};

exports.answerQuestionary = async (req, res) => {
  const { encuestaId } = req.params;
  const { respuestas, usuarioId } = req.body; // [{ preguntaId, valor }]
  /*

  {
    "usuarioId": 1,
    "respuestas": [
      {
        "preguntaId": 1,
        "valor": 5
      },
      {
        "preguntaId": 2,
        "valor": 4
      }
  }

  */

  try {
    const encuesta = await Encuesta.findByPk(encuestaId);

    if (!encuesta) {
      return res.status(404).json({ error: "Encuesta no encontrada." });
    }

    // Crear las respuestas, asociándolas al usuario
    const respuestasToCreate = respuestas.map((r) => ({
      encuesta_id: encuestaId,
      pregunta_id: r.preguntaId,
      usuario_id: usuarioId,
      valor: r.valor,
    }));

    await Respuesta.bulkCreate(respuestasToCreate);

    res.status(201).json({ message: "Respuestas guardadas exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al guardar las respuestas." });
  }
};

exports.getQuestionaryAnswers = async (req, res) => {
  const { encuestaId } = req.params;

  try {
    const respuestas = await Respuesta.findAll({
      where: { encuesta_id: encuestaId },
      include: [
        {
          model: Pregunta,
          as: "pregunta",
          attributes: ["id", "contenido"],
        },
        {
          model: Usuario,
          as: "usuario",
          attributes: ["id", "nombre"],
        },
      ],
    });

    if (!respuestas.length) {
      return res
        .status(404)
        .json({ error: "No se encontraron respuestas para esta encuesta." });
    }

    res.status(200).json(
      respuestas.map((respuesta) => ({
        usuario: respuesta.usuario ? respuesta.usuario.nombre : "Anónimo",
        pregunta: respuesta.pregunta.contenido,
        valor: respuesta.valor,
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener las respuestas." });
  }
};

exports.createRisksQuestionary = async (req, res) => {
  const { creadorId, softwareId } = req.body;

  try {
    const creador = await Usuario.findByPk(creadorId);
    if (!creador) {
      return res.status(404).json({ error: "El usuario creador no existe." });
    }

    const tipoEncuesta = await TipoEncuesta.findOne({
      where: { nombre: "Riesgos" },
    });
    if (!tipoEncuesta) {
      return res
        .status(404)
        .json({ error: "El tipo de encuesta 'Riesgos' no existe." });
    }

    const nuevaEncuesta = await Encuesta.create({
      tipo_encuesta_id: tipoEncuesta.id,
      modelo_calidad_id: null,
      software_id: softwareId || null,
      creador_id: creadorId,
    });

    res.status(201).json({
      message: "Encuesta de riesgos creada exitosamente.",
      encuesta: {
        id: nuevaEncuesta.id,
        tipo_encuesta_id: nuevaEncuesta.tipo_encuesta_id,
        software_id: nuevaEncuesta.software_id,
        creador_id: nuevaEncuesta.creador_id,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la encuesta de riesgos." });
  }
};

exports.getRisksQuestionary = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      where: { tipo_encuesta_id: { [Sequelize.Op.ne]: null } },
      include: {
        model: Pregunta,
        as: "preguntas",
      },
    });

    res.status(200).json(
      categorias.map((categoria) => ({
        id: categoria.id,
        nombre: categoria.nombre,
        preguntas: categoria.preguntas.map((pregunta) => ({
          id: pregunta.id,
          contenido: pregunta.contenido,
        })),
      }))
    );
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener categorías y preguntas de riesgos." });
  }
};

exports.answerRisksQuestionary = async (req, res) => {
  const { encuestaId } = req.params;
  const { usuarioId, respuestas } = req.body;

  try {
    // Verificar si la encuesta existe y es de riesgos
    const encuesta = await Encuesta.findOne({
      where: { id: encuestaId },
    });
    if (!encuesta) {
      return res.status(404).json({ error: "Encuesta no encontrada." });
    }

    // Validar que el usuario existe
    const usuario = await Usuario.findByPk(usuarioId);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }

    // Validar las respuestas
    const respuestasToCreate = [];
    for (const respuesta of respuestas) {
      // Verificar que la pregunta pertenece a la encuesta
      const pregunta = await Pregunta.findOne({
        where: { id: respuesta.preguntaId },
        include: {
          model: Categoria,
          as: "categoria",
          where: { tipo_encuesta_id: encuesta.tipo_encuesta_id }, // Asegurar que es de riesgos
        },
      });

      if (!pregunta) {
        return res.status(400).json({
          error: `La pregunta con ID ${respuesta.preguntaId} no pertenece a esta encuesta.`,
        });
      }

      // Validar que el valor esté entre 1 y 5
      if (respuesta.valor < 1 || respuesta.valor > 5) {
        return res.status(400).json({
          error: `El valor para la pregunta ${respuesta.preguntaId} debe estar entre 1 y 5.`,
        });
      }

      // Evitar respuestas duplicadas dentro de la misma encuesta
      const respuestaExistente = await Respuesta.findOne({
        where: {
          encuesta_id: encuestaId,
          pregunta_id: respuesta.preguntaId,
          usuario_id: usuarioId, // Mismo usuario en la misma encuesta
        },
      });
      if (respuestaExistente) {
        return res.status(400).json({
          error: `Ya existe una respuesta para la pregunta ${respuesta.preguntaId} en esta encuesta por el usuario ${usuarioId}.`,
        });
      }

      // Agregar respuesta a la lista para creación masiva
      respuestasToCreate.push({
        encuesta_id: encuestaId,
        pregunta_id: respuesta.preguntaId,
        usuario_id: usuarioId,
        valor: respuesta.valor,
      });
    }

    // Crear todas las respuestas
    await Respuesta.bulkCreate(respuestasToCreate);

    res.status(201).json({ message: "Respuestas guardadas exitosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al guardar las respuestas." });
  }
};
