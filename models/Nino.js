const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ninoSchema = new Schema({
    usuario_id: { type: mongoose.Schema.Types.ObjectId, ref: "Usuarios", required: true },
    nombre: { type: String, required: true },
    fecha_nacimiento: { type: Date, required: true },
    sexo: { type: String, enum: ["Masculino", "Femenino"], required: true },
    identificacion: { type: String }, // opcional, puede ser número de cédula o código nacional
    
});

module.exports = mongoose.model("Nino", ninoSchema);