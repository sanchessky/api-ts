//Configuração do Express
import express from "express";
import routes from "./routes/userRoutes";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/api", routes);

app.listen(port, () => {
    console.log(`Servidor online em http://127.0.0.1:${port}`);
});
