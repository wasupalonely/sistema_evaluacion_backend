const { Empresa, Usuario } = require("../models");

exports.createCompany = async (req, res) => {
  const { nombre, admin_id } = req.body;
  try {
    const userExists = await Usuario.findByPk(admin_id);

    if (!userExists) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (userExists.empresa_id) {
      return res.status(400).json({ message: "El usuario ya tiene una empresa" });
    }

    const empresa = await Empresa.create({ nombre, admin_id });

    userExists.empresa_id = empresa.id;
    await userExists.save();

    res.json(empresa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateCompany = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const empresa = await Empresa.findByPk(id);
    if (!empresa) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }
    empresa.nombre = nombre;
    await empresa.save();
    res.json(empresa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const empresa = await Empresa.findByPk(id);
    if (!empresa) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }
    await empresa.destroy();
    res.json({ message: "Empresa eliminada" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};