const express = require("express");
const {
  createCompany,
  updateCompany,
  deleteCompany,
} = require("../controllers/empresaController");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", verifyToken, verifyRole(["Administrador"]), createCompany);
router.put("/:id", verifyToken, verifyRole(["Administrador"]), updateCompany);
router.delete(
  "/:id",
  verifyToken,
  verifyRole(["Administrador"]),
  deleteCompany
);

module.exports = router;
