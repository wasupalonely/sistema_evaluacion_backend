const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  getUsersByCompany,
  getUserById,
  updateUser,
  deleteUser,
  addUserToCompany,
} = require("../controllers/userController");
const { verifyToken, verifyRole } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post(
  "/add-user",
  verifyToken,
  verifyRole(["Administrador"]),
  addUserToCompany
);
router.post("/login", loginUser);
router.get("/", verifyToken, getAllUsers);
router.get(
  "/empresa/:id",
  verifyToken,
  verifyRole(["Administrador"]),
  getUsersByCompany
);
router.get("/:id", getUserById);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

module.exports = router;
