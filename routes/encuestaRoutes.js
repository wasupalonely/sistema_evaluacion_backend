const express = require("express");
const { verifyToken } = require("../middlewares/authMiddleware");
const {
  getQualityModelById,
  createQuestionary,
  answerQuestionary,
  getQuestionaryAnswers,
} = require("../controllers/encuestaController");

const router = express.Router();

router.get("/cuestionario/:modeloId", verifyToken, getQualityModelById);
router.post("/", verifyToken, createQuestionary);
router.post("/:encuestaId/respuestas", verifyToken, answerQuestionary);
router.get("/:encuestaId/respuestas", verifyToken, getQuestionaryAnswers);

module.exports = router;
