const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recomendacionesSchema = new Schema({
    edad_min_meses: { type: Number, required: true },
    edad_max_meses: { type: Number, required: true },
    recomendacion: { type: String, required: true }
});

module.exports = mongoose.model("Recomendaciones", recomendacionesSchema);