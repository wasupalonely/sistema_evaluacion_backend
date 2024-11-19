const jwt = require("jsonwebtoken");
const { Usuario, Rol } = require("../models");

const secretKey = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "No se proporcionó un token" });
  }

  jwt.verify(token.split(" ")[1], secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }
    req.userId = decoded.id;
    next();
  });
};

exports.verifyRole = (rolesPermitidos) => {
  return async (req, res, next) => {
    try {
      const usuario = await Usuario.findByPk(req.userId, {
        include: { model: Rol, as: "rol" },
      });

      if (!usuario || !rolesPermitidos.includes(usuario.rol.dataValues.nombre)) {
        return res.status(403).json({ message: "Acceso denegado" });
      }

      next();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error verificando rol", error: error.message });
    }
  };
};

exports.generateToken = (user) => {
  return jwt.sign({ id: user.id }, secretKey, { expiresIn: "8h" });
};
