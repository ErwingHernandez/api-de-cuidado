const Niño = require("../models/Nino");

// Obtener todos los registros de Niños
const getNino = async (req, res) => {
    try {
        const ninos = await Niño.find()
        res.json(ninos);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener control de software" });
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
        const updated = await Niño.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: "Error al actualizar registro de software" });
    }
};

// Eliminar Niño
const deleteNino = async (req, res) => {
    try {
        await Niño.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Registro de software eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar registro de software" });
    }
};

module.exports = {
    getNino,
    createNino,
    updateNino,
    deleteNino
};