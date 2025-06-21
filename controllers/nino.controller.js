const Nino = require("../models/Nino");

// Obtener todos los registros de Niños
const getNino = async (req, res) => {
    try {
        const ninos = await Nino.find()
        res.json(ninos);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener control de software" });
    }
};

const getNinoPorUsuario = async (req, res) => {
    try {
        const ninos = await Nino.find({ usuario_id: req.params.id });
        res.json(ninos);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener niños del usuario" });
    }

    
};

// Crear nuevo Niño
const createNino = async (req, res) => {
    try {
        const nuevo = new Niño(req.body);
        await nuevo.save();
        res.status(201).json(nuevo);
    } catch (err) {
        res.status(400).json({ error: "Error al crear registro de software" });
    }
};

// Actualizar Niño
const updateNino = async (req, res) => {
    try {
        const updated = await Nino.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: "Error al actualizar registro de software" });
    }
};

// Eliminar Niño
const deleteNino = async (req, res) => {
    try {
        await Nino.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Registro de software eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar registro de software" });
    }
};

module.exports = {
    getNino,
    createNino,
    updateNino,
    deleteNino,
    getNinoPorUsuario
};