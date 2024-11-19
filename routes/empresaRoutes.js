const express = require("express");
const { createCompany } = require("../controllers/empresaController");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/", verifyToken, verifyRole(["Administrador"]), createCompany);
// router.post("/user/:userId", getCompanyByUserId);

module.exports = router;
