const {
  ModeloCalidad,
  Categoria,
  Pregunta,
  Encuesta,
  TipoEncuesta,
  Software,
  Respuesta,
  Usuario,
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
