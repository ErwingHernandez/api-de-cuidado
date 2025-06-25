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

const createNino = async (req, res) => {
    try {
        const { usuario_id, nombre, fecha_nacimiento, sexo, identificacion } = req.body;

        // Validar campos requeridos manualmente si prefieres errores más específicos antes de Mongoose
        if (!usuario_id || !nombre || !fecha_nacimiento || !sexo) {
            return res.status(400).json({ error: "Faltan campos obligatorios." });
        }

        
        const fechaNacimientoDate = new Date(fecha_nacimiento);

        // Opcional: Validar si la conversión resultó en una fecha válida
        if (isNaN(fechaNacimientoDate.getTime())) { // getTime() devuelve NaN si la fecha es inválida
            return res.status(400).json({ error: "Formato de fecha de nacimiento inválido." });
        }

        const nuevo = new Nino({
            usuario_id,
            nombre,
            fecha_nacimiento: fechaNacimientoDate, // Usa el objeto Date convertido
            sexo,
            identificacion: identificacion || null // Asegura que se guarde como null si es una cadena vacía
        });

        await nuevo.save();
        res.status(201).json(nuevo);
    } catch (err) {
        console.error("Error al crear niño:", err); // Loggea el error completo para depuración
        // Puedes verificar si el error es de validación de Mongoose
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ error: "Error de validación: " + messages.join(', ') });
        }
        res.status(400).json({ error: "Error al crear registro de software", details: err.message }); // Más detalles
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