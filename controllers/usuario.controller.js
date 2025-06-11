const Usuario = require("../models/Usuarios");

// Obtener todos los registros de usuarios
const getUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.find()
        res.json(usuario);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener control de software" });
    }
};

// Crear nuevo usuario
const createUsuario = async (req, res) => {
    try {
        const nuevo = new Niño(req.body);
        await nuevo.save();
        res.status(201).json(nuevo);
    } catch (err) {
        res.status(400).json({ error: "Error al crear registro de software" });
    }
};

// Actualizar usuario
const updateUsuario = async (req, res) => {
    try {
        const updated = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: "Error al actualizar registro de software" });
    }
};

// Eliminar usuario
const deleteUsuario = async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Registro de software eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar registro de software" });
    }
};

module.exports = {
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
};