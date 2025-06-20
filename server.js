const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/ninos", require("./routes/nino.routes.js"));
app.use("/api/usuarios", require("./routes/usuario.routes.js"));
app.use("/api/recomendaciones", require("./routes/recomendaciones.routes.js"));
app.use("/api/controlcrecimiento", require("./routes/controlcrecimiento.routes.js"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}/api/`);
});