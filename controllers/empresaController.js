const { Empresa, Usuario } = require("../models");

exports.createCompany = async (req, res) => {
  const { nombre, admin_id } = req.body;
  try {
    const userExists = await Usuario.findByPk(admin_id);

    if (!userExists) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const empresa = await Empresa.create({ nombre, admin_id });

    userExists.empresa_id = empresa.id;
    await userExists.save();

    res.json(empresa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};