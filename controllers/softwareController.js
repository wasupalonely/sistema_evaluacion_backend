const { Software, Empresa, Usuario } = require("../models");

exports.createSoftware = async (req, res) => {
  const { nombre, empresa_id, creador_id } = req.body;
  try {
    const userExists = await Usuario.findByPk(creador_id);

    if (!userExists) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const companyExists = await Empresa.findByPk(empresa_id);

    if (!companyExists) {
      return res.status(404).json({ message: "Empresa no encontrada" });
    }

    const softwareExists = await Software.findOne({
      where: { nombre, empresa_id },
    });

    if (softwareExists) {
      return res.status(400).json({ message: "El software ya existe" });
    }

    const software = await Software.create({ nombre, creador_id, empresa_id });

    res.json(software);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSoftwaresByCompany = async (req, res) => {
  const { id } = req.params;
  try {
    const softwares = await Software.findAll({
      where: { empresa_id: id },
    });
    res.json(softwares);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSofwaresByCompanyAndUser = async (req, res) => {
  const { empresa_id, creador_id } = req.params;
  try {
    const softwares = await Software.findAll({
      where: { empresa_id, creador_id },
    });
    res.json(softwares);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getSoftwareById = async (req, res) => {
  const { id } = req.params;
  try {
    const software = await Software.findByPk(id);
    if (!software) {
      return res.status(404).json({ message: "Software no encontrado" });
    }
    res.json(software);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateSoftware = async (req, res) => {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const software = await Software.findByPk(id);
    if (!software) {
      return res.status(404).json({ message: "Software no encontrado" });
    }

    const softwareExists = await Software.findOne({
      where: { nombre, empresa_id: software.empresa_id },
    });

    if (softwareExists) {
      return res.status(400).json({ message: "El software ya existe" });
    }
    software.nombre = nombre;
    await software.save();
    res.json(software);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteSoftware = async (req, res) => {
  const { id } = req.params;
  try {
    const software = await Software.findByPk(id);
    if (!software) {
      return res.status(404).json({ message: "Software no encontrado" });
    }
    await software.destroy();
    res.json({ message: "Software eliminado" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
