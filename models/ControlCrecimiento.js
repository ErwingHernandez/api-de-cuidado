const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const controlcrecimientoSchema = new Schema({
    child_id: { type: mongoose.Schema.Types.ObjectId, ref: "Niño", required: true },
    fecha: { type: Date, required: true },
    peso_kg: { type: Number, required: true },
    talla_cm: { type: Number, required: true },
    edad_meses: { type: Number, required: true },
    imc: { type: Number }, // se puede calcular automáticamente
    observaciones: { type: String }
});

module.exports = mongoose.model("ControlCrecimiento", controlcrecimientoSchema);