const ControlCrecimiento = require("../models/ControlCrecimiento");

// Obtener todos los registros de ControlCrecimiento
const getControlCrecimiento = async (req, res) => {
    try {
        const controlcrecimiento = await ControlCrecimiento.find()
        res.json(controlcrecimiento);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener control de software" });
    }
};

// Crear nuevo ControlCrecimiento
const createControlCrecimiento = async (req, res) => {
    try {
        const nuevo = new Niño(req.body);
        await nuevo.save();
        res.status(201).json(nuevo);
    } catch (err) {
        res.status(400).json({ error: "Error al crear registro de software" });
    }
};

// Actualizar ControlCrecimiento
const updateControlCrecimiento = async (req, res) => {
    try {
        const updated = await ControlCrecimiento.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: "Error al actualizar registro de software" });
    }
};

// Eliminar ControlCrecimiento
const deleteControlCrecimiento = async (req, res) => {
    try {
        await ControlCrecimiento.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Registro de software eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar registro de software" });
    }
};

module.exports = {
    getControlCrecimiento,
    createControlCrecimiento,
    updateControlCrecimiento,
    deleteControlCrecimiento
};