const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Usuario, Rol, Empresa } = require("../models");

exports.registerUser = async (req, res) => {
  const { nombre, correo, contrasena, rol_id } = req.body;
  try {
    const rol = await Rol.findOne({ where: { nombre: "Administrador" } });
    if (!rol) {
      return res.status(404).json({ message: "Error al obtener el rol" });
    }
    const existingUser = await Usuario.findOne({ where: { correo } });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya esta registrado" });
    }
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const user = await Usuario.create({
      nombre,
      correo,
      contrasena: hashedPassword,
      rol_id: rol.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { correo, contrasena } = req.body;
  try {
    const user = await Usuario.findOne({
      where: { correo },
      include: [
        { model: Empresa, as: "empresa" },
        { model: Rol, as: "rol" },
      ],
    });
    if (!user || !(await bcrypt.compare(contrasena, user.contrasena))) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    res.json({ token, user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Usuario.findByPk(id, {
      include: [
        { model: Empresa, as: "empresa" },
        { model: Rol, as: "rol" },
      ],
    });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await Usuario.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { nombre, correo, contrasena, empresa_id } = req.body;
  try {
    const user = await Usuario.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    user.nombre = nombre;
    user.correo = correo;
    user.contrasena = contrasena;
    user.empresa_id = empresa_id;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Usuario.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    await user.destroy();
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUsersByCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await Usuario.findAll({ where: { empresa_id: id } });
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.addUserToCompany = async (req, res) => {
  const { nombre, correo, contrasena, empresa_id } = req.body;
  try {
    const existingUser = await Usuario.findOne({ where: { correo } });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya esta registrado" });
    }
    const empresa = await Empresa.findByPk(empresa_id);
    if (!empresa) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }
    const rol = await Rol.findOne({ where: { nombre: "Usuario" } });
    if (!rol) {
      return res.status(404).json({ message: "Error al obtener el rol" });
    }
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    const user = await Usuario.create({
      nombre,
      correo,
      contrasena: hashedPassword,
      empresa_id,
      rol_id: rol.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUserFromCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Usuario.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    await user.destroy();
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
