require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Rutas principales
app.use("/api/v1/users", require("./routes/userRoutes"));
app.use("/api/v1/empresas", require("./routes/empresaRoutes"));
app.use("/api/v1/software", require("./routes/softwareRoutes"));
app.use("/api/v1/encuestas", require("./routes/encuestaRoutes"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
