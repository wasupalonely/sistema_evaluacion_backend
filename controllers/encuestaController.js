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
  Empresa,
} = require("../models");
const {
  calcularNivelRiesgo,
  calcularPromedioCalidad,
} = require("../utils/calculations");

exports.getAllQualityModels = async (req, res) => {
  try {
    const qualityModels = await ModeloCalidad.findAll();

    res.status(200).json(qualityModels);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSurveysByCompany = async (req, res) => {
  const { id } = req.params;

  try {
    const empresaAEncontrar = await Empresa.findOne({
      where: { id },
      include: {
        model: Software,
        as: "softwares",
      },
    });

    if (!empresaAEncontrar) {
      return res
        .status(404)
        .json({ message: "empresaAEncontrar no encontrada" });
    }

    const encuestas = await Encuesta.findAll({
      where: {
        software_id: empresaAEncontrar.softwares.map((software) => software.id),
      },
      include: [
        {
          model: Software,
          as: "software",
        },
        {
          model: ModeloCalidad,
          as: "modelo_calidad",
        },
        {
          model: TipoEncuesta,
          as: "tipo_encuesta",
        },
        {
          model: Usuario, // Relación con el modelo Usuario
          as: "creador", // Alias definido en el modelo Encuesta
          attributes: ["id", "nombre", "correo"], // Selecciona los campos necesarios del creador
        },
      ],
    });

    res.status(200).json(encuestas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSurveysByCompanyAndUser = async (req, res) => {
  const { empresaId, usuarioId } = req.params;

  try {
    const empresaAEncontrar = await Empresa.findOne({
      where: { id: empresaId },
      include: {
        model: Software,
        as: "softwares",
      },
    });

    if (!empresaAEncontrar) {
      return res
        .status(404)
        .json({ message: "empresaAEncontrar no encontrada" });
    }

    const encuestas = await Encuesta.findAll({
      where: {
        software_id: empresaAEncontrar.softwares.map((software) => software.id),
        creador_id: usuarioId,
      },
      include: [
        {
          model: Software,
          as: "software",
        },
        {
          model: ModeloCalidad,
          as: "modelo_calidad",
        },
        {
          model: TipoEncuesta,
          as: "tipo_encuesta",
        },
        {
          model: Usuario, // Relación con el modelo Usuario
          as: "creador", // Alias definido en el modelo Encuesta
          attributes: ["id", "nombre", "correo"], // Selecciona los campos necesarios del creador
        },
      ],
    });

    res.status(200).json(encuestas);
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
        return res.status(400).json({
          error: `Pregunta con ID ${respuesta.preguntaId} no encontrada.`,
        });
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
    res
      .status(500)
      .json({ error: "Error al procesar la encuesta de riesgos." });
  }
};

exports.getSurveyResults = async (req, res) => {
  const { encuestaId } = req.params;

  try {
    const encuesta = await Encuesta.findByPk(encuestaId, {
      include: [
        {
          model: Respuesta,
          as: "respuestas",
        },
      ],
    });

    if (!encuesta) {
      return res.status(404).json({ error: "Encuesta no encontrada." });
    }

    const respuestas = encuesta.respuestas;
    if (respuestas.length === 0) {
      return res.status(200).json({
        encuestaId,
        usuario_id: null,
        resultados: [],
        mensaje: "No hay respuestas registradas para esta encuesta.",
      });
    }

    const usuario_id = respuestas[0]?.usuario_id;

    const tipoEncuesta = await TipoEncuesta.findByPk(encuesta.tipo_encuesta_id);

    if (!tipoEncuesta) {
      return res.status(404).json({ error: "Tipo de encuesta no encontrado." });
    }

    const esEncuestaDeRiesgo = tipoEncuesta?.nombre === "Riesgos";

    if (esEncuestaDeRiesgo) {
      // Agrupación por categorías de riesgo
      const categorias = {};

      for (const respuesta of respuestas) {
        const pregunta = await Pregunta.findByPk(respuesta.pregunta_id, {
          include: [
            {
              model: Categoria,
              as: "categoria",
            },
          ],
        });

        if (!pregunta) continue;

        const categoria = pregunta.categoria.nombre || "Sin categoría";
        if (!categorias[categoria]) {
          categorias[categoria] = [];
        }

        const impacto = pregunta.impacto || {};
        const { riesgo, nivelRiesgo } = calcularNivelRiesgo(
          respuesta.valor,
          impacto
        );

        categorias[categoria].push({
          preguntaId: pregunta.id,
          contenido: pregunta.contenido,
          respuesta: respuesta.valor,
          totalRiesgo: riesgo,
          nivelRiesgo,
        });
      }

      return res.status(200).json({
        encuestaId: Number(encuestaId),
        usuario_id,
        categorias,
      });
    } else {
      // Proceso para encuestas de calidad
      const categorias = {};
      let ponderadoGlobal = 0;
      // Agrupar respuestas por categorías y realizar cálculos
      for (const respuesta of respuestas) {
        const pregunta = await Pregunta.findByPk(respuesta.pregunta_id, {
          include: [
            {
              model: Categoria,
              as: "categoria",
            },
          ],
        });
        if (!pregunta) continue;

        const categoria = pregunta.categoria.nombre || "Sin categoría";
        if (!categorias[categoria]) {
          categorias[categoria] = {
            preguntas: [],
            maximoPuntos: 0,
            valor: 0,
            ponderado: 0,
          };
        }

        categorias[categoria].preguntas.push({
          preguntaId: pregunta.id,
          contenido: pregunta.contenido,
          valor: respuesta.valor,
        });

        categorias[categoria].maximoPuntos += 5;
        categorias[categoria].valor += respuesta.valor;
      }

      // Calcular porcentajes y ponderados
      const numeroCategorias = Object.keys(categorias).length;

      for (const [categoria, data] of Object.entries(categorias)) {
        const promedioCategoria = (data.valor / data.maximoPuntos) * 100;

        const ponderado = ((100 / numeroCategorias) * promedioCategoria) / 100;

        categorias[categoria].promedioCategoria = promedioCategoria.toFixed(2);
        categorias[categoria].ponderado = ponderado.toFixed(2);

        ponderadoGlobal += ponderado;
      }

      // Clasificación del ponderado global
      let nivelGlobal = "Deficiente";
      if (ponderadoGlobal >= 90) nivelGlobal = "Excelente";
      else if (ponderadoGlobal >= 80) nivelGlobal = "Muy Bueno";
      else if (ponderadoGlobal >= 70) nivelGlobal = "Bueno";
      else if (ponderadoGlobal >= 60) nivelGlobal = "Insuficiente";

      return res.status(200).json({
        encuestaId: Number(encuestaId),
        usuario_id,
        categorias,
        ponderadoGlobal: ponderadoGlobal.toFixed(2),
        nivelGlobal,
      });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al obtener los resultados de la encuesta." });
  }
};
