import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import cors from "cors";
import path from "path";
import menuRoutes from "./routes/menuRoutes";

const app = express();
const PORT = process.env.PORT || 8080;
const MONGODB_URI = `mongodb+srv://root:root@cluster0.ct5imhj.mongodb.net/menuio-db`;
const pathname = "/api/v1";
dotenv.config();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Cors
app.use(cors());

// Configuração do Swagger
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        components: {
            securitySchemes: {
                bearerAuth: {type: "http", scheme: "bearer", bearerFormat: "JWT"},
            },
        },

        info: {
            title: "Menu.io",
            version: "1.0.0",
            description: "Api Documentation",
        },
        servers: [
            {
                url: `http://localhost:${PORT}${pathname}`,
                description: "Servidor Local",
            },
        ],
    },
    apis: [`${path.join(process.cwd())}/src/routes/*.ts`],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

app.use(`${pathname}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

mongoose.connect(MONGODB_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Erro de conexão com o MongoDB:"));
db.once("open", () => {
    console.log("Conexão com o MongoDB estabelecida com sucesso.");
});

app.use(`${pathname}/users`, userRoutes);
app.use(`${pathname}/login`, authRoutes);
app.use(`${pathname}/menu`, menuRoutes);


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
