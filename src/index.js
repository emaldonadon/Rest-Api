import express from "express";
const app = express();
import { PORT } from "./config.js";
import router from "./routes/trabajadores.routers.js";
import morgan from "morgan";

app.use(express.json())
app.use(morgan("dev"))
app.use('/api', router)

app.listen(PORT, () => {
    console.log("Servidor corriendo ene el puerto", PORT);
});