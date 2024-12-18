const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const {
  getQualityModelById,
  createQuestionary,
  getQuestionaryAnswers,
  getRisksQuestionary,
  createRisksQuestionary,
  getAllQualityModels,
  answerQualitySurvey,
  answerRiskSurvey,
  getSurveyResults,
  getSurveysByCompany,
  getSurveysByCompanyAndUser,
} = require("../controllers/encuestaController");

const router = express.Router();

// CALIDAD
router.get("/cuestionario/:modeloId", verifyToken, getQualityModelById);
router.post("/", verifyToken, createQuestionary);
router.post("/:encuestaId/respuestas", verifyToken, answerQualitySurvey);
router.get("/:encuestaId/respuestas", verifyToken, getQuestionaryAnswers);
router.get("/", verifyToken, getAllQualityModels);

// RIESGOS
router.get("/riesgos/categorias", verifyToken, getRisksQuestionary);
router.post("/riesgos", verifyToken, createRisksQuestionary);
router.post("/:encuestaId/riesgos/responder", verifyToken, answerRiskSurvey);

// OBTENER RESULTADOS
router.get("/:encuestaId/resultados", verifyToken, getSurveyResults);
router.get("/empresa/:id", verifyToken, getSurveysByCompany);
router.get(
  "/empresa/:empresaId/usuario/:usuarioId",
  verifyToken,
  getSurveysByCompanyAndUser
);

module.exports = router;
