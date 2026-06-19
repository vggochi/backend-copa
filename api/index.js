import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import produtos from "../src/routes/produtos.js";
import usuarios from "../src/routes/usuarios.js";
import carrinho from "../src/routes/carrinho.js";
import pedidos from "../src/routes/pedidos.js";
import auth from "../src/routes/auth.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        status: "API Mercado da Copa funcionando ⚽",
        versao: "1.0.0",
        rotas: [
            "/produtos",
            "/usuarios",
            "/carrinho",
            "/pedidos",
            "/auth/cadastro",
            "/auth/login"
        ]
    });
});

// ROTAS
app.use("/produtos", produtos);
app.use("/usuarios", usuarios);
app.use("/carrinho", carrinho);
app.use("/pedidos", pedidos);
app.use("/auth", auth);

export default app;