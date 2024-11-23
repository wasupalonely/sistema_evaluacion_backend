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

exports.getAllQualityModels = async (req, res) => {
  try {
    const qualityModels = await ModeloCalidad.findAll();

    res.status(200).json(qualityModels);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

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

exports.answerQualitySurvey = async (req, res) => {
  const { encuestaId } = req.params;
  const { respuestas, usuarioId } = req.body;

  try {
    const encuesta = await Encuesta.findByPk(encuestaId);

    if (!encuesta) {
      return res.status(404).json({ error: "Encuesta no encontrada." });
    }

    const respuestasToCreate = respuestas.map((r) => ({
      encuesta_id: encuestaId,
      pregunta_id: r.preguntaId,
      usuario_id: usuarioId,
      valor: r.valor,
    }));

    await Respuesta.bulkCreate(respuestasToCreate);

    const promedio =
      respuestas.reduce((sum, respuesta) => sum + respuesta.valor, 0) /
      respuestas.length;

    res.status(201).json({
      message: "Respuestas guardadas exitosamente.",
      promedioCalidad: promedio.toFixed(2),
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al procesar la encuesta de calidad." });
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
      where: { modelo_calidad_id: { [Sequelize.Op.eq]: null } },
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

exports.answerRiskSurvey = async (req, res) => {
  const { encuestaId } = req.params;
  const { respuestas, usuarioId } = req.body;

  try {
    const encuesta = await Encuesta.findByPk(encuestaId);

    if (!encuesta) {
      return res.status(404).json({ error: "Encuesta no encontrada." });
    }

    const respuestasToCreate = respuestas.map((r) => ({
      encuesta_id: encuestaId,
      pregunta_id: r.preguntaId,
      usuario_id: usuarioId,
      valor: r.valor,
    }));

    await Respuesta.bulkCreate(respuestasToCreate);

    const resultados = [];

    for (const respuesta of respuestas) {
      const pregunta = await Pregunta.findByPk(respuesta.preguntaId);

      if (!pregunta) {
        return res
          .status(400)
          .json({ error: `Pregunta con ID ${respuesta.preguntaId} no encontrada.` });
      }

      const impacto = pregunta.impacto;

      if (!impacto) {
        return res.status(400).json({
          error: `Impacto no definido para la pregunta ${respuesta.preguntaId}.`,
        });
      }

      const riesgoPregunta =
        respuesta.valor *
        (impacto.alcance + impacto.tiempo + impacto.costo + impacto.calidad);

      let nivelRiesgo = "Muy Bajo";

      if (riesgoPregunta > 80) nivelRiesgo = "Muy Alto";
      else if (riesgoPregunta >= 51) nivelRiesgo = "Alto";
      else if (riesgoPregunta >= 31) nivelRiesgo = "Medio";
      else if (riesgoPregunta >= 11) nivelRiesgo = "Bajo";

      resultados.push({
        preguntaId: respuesta.preguntaId,
        riesgo: riesgoPregunta,
        nivelRiesgo,
      });
    }

    res.status(201).json({
      message: "Respuestas guardadas exitosamente.",
      resultados,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al procesar la encuesta de riesgos." });
  }
};
