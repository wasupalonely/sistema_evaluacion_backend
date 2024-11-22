const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const {
  getQualityModelById,
  createQuestionary,
  answerQuestionary,
  getQuestionaryAnswers,
  getRisksQuestionary,
  createRisksQuestionary,
  answerRisksQuestionary,
  getAllQualityModels,
} = require("../controllers/encuestaController");

const router = express.Router();

// CALIDAD
router.get("/cuestionario/:modeloId", verifyToken, getQualityModelById);
router.post("/", verifyToken, createQuestionary);
router.post("/:encuestaId/respuestas", verifyToken, answerQuestionary);
router.get("/:encuestaId/respuestas", verifyToken, getQuestionaryAnswers);
router.get("/", verifyToken, getAllQualityModels);

// RIESGOS
router.get("/riesgos/categorias", verifyToken, getRisksQuestionary);
router.post("/riesgos", verifyToken, createRisksQuestionary);
router.post(
  "/:encuestaId/riesgos/responder",
  verifyToken,
  answerRisksQuestionary
);

module.exports = router;
