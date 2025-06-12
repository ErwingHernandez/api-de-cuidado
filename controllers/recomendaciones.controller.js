const Recomendacion = require("../models/Recomendaciones");

// Obtener todos los registros de recomendaciones
const getRecomendacion = async (req, res) => {
    try {
        const recomendacion = await Recomendacion.find()
        res.json(recomendacion);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener control de software" });
    }
};

// Crear nuevo recomendaciones
const createRecomendacion = async (req, res) => {
    try {
        const nuevo = new Recomendacion(req.body);
        await nuevo.save();
        res.status(201).json(nuevo);
    } catch (err) {
        res.status(400).json({ error: "Error al crear registro de software" });
    }
};

// Actualizar recomendaciones
const updateRecomendacion = async (req, res) => {
    try {
        const updated = await Recomendacion.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: "Error al actualizar registro de software" });
    }
};

// Eliminar recomendaciones
const deleteRecomendacion = async (req, res) => {
    try {
        await Recomendacion.findByIdAndDelete(req.params.id);
        res.json({ mensaje: "Registro de software eliminado correctamente" });
    } catch (err) {
        res.status(500).json({ error: "Error al eliminar registro de software" });
    }
};

module.exports = {
    getRecomendacion,
    createRecomendacion,
    updateRecomendacion,
    deleteRecomendacion
};