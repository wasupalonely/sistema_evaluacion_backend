const express = require("express");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const {
  getSoftwaresByCompany,
  createSoftware,
  getSoftwareById,
  updateSoftware,
  deleteSoftware,
  getSofwaresByCompanyAndUser,
} = require("../controllers/softwareController");
const router = express.Router();

router.post("/", verifyToken, createSoftware);
router.get("/empresa/:id", verifyToken, getSoftwaresByCompany);
router.get(
  "/empresa/:empresa_id/creador/:creador_id",
  verifyToken,
  getSofwaresByCompanyAndUser
);
router.get("/:id", verifyToken, getSoftwareById);
router.put("/:id", verifyToken, updateSoftware);
router.delete("/:id", verifyToken, deleteSoftware);

module.exports = router;
