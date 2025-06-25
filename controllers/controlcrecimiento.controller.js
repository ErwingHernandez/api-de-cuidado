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

const getControlPorNino = async (req, res) => {
    try {
        const controles = await ControlCrecimiento.find({ child_id: req.params.id });
        res.json(controles);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener controles del niño" });
    }
};

// Crear nuevo ControlCrecimiento
const createControlCrecimiento = async (req, res) => {
      try {
        const { child_id, fecha, peso_kg, talla_cm, edad_meses, imc, observaciones } = req.body;

    
        // Convertir la cadena de fecha (YYYY-MM-DD) a un objeto Date
        const fechaRegistroDate = new Date(fecha);

        // Opcional: Validar si la conversión resultó en una fecha válida
        if (isNaN(fechaRegistroDate.getTime())) {
            return res.status(400).json({ error: "Formato de fecha de registro inválido. Debe ser YYYY-MM-DD." });
        }

        // --- Validaciones básicas de campos requeridos (opcional, Mongoose también valida) ---
        if (!child_id || !fecha || peso_kg == null || talla_cm == null || edad_meses == null) {
            return res.status(400).json({ error: "Faltan campos obligatorios para el registro de crecimiento." });
        }
        if (typeof peso_kg !== 'number' || typeof talla_cm !== 'number' || typeof edad_meses !== 'number') {
            return res.status(400).json({ error: "Peso, talla y edad deben ser números." });
        }


        const nuevo = new ControlCrecimiento({
            child_id: child_id,
            fecha: fechaRegistroDate, // ¡Usa el objeto Date convertido!
            peso_kg: peso_kg,
            talla_cm: talla_cm,
            edad_meses: edad_meses,
            imc: imc, // Este ya puede ser null o el valor si viene
            observaciones: observaciones || null // Asegura null si es string vacío
        });

        await nuevo.save();
        res.status(201).json(nuevo);
    } catch (err) {
        console.error("Error al crear control de crecimiento:", err); // Log más detallado del error

        // Manejo de errores de validación de Mongoose
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ error: "Error de validación: " + messages.join(', ') });
        }
        res.status(400).json({ error: "Error al crear registro de software", details: err.message }); // Mensaje con más detalles
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
    deleteControlCrecimiento,
    getControlPorNino
};