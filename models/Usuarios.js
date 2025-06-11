const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usuariosSchema = new Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    contraseña: { type: String, required: true },
    rol: { type: String, enum: ["Padre", "Medico"], required: true },
    telefono: { type: String },
    direccion: { type: String }
});

module.exports = mongoose.model("Usuarios", usuariosSchema);