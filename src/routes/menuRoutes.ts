import express from "express";
import * as menuController from "../controllers/menuController";
import { verifyToken } from "../middlewares/checkAuthJwt";
import multer from "multer";

// Configuração do multer para armazenar imagens localmente
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Define a pasta onde os arquivos serão armazenados
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: MenuItems
 *   description: Operações relacionadas aos menus
 */

/**
 * @swagger
 * paths:
 *  /menu:
 *    get:
 *      summary: Retorna todos os menus
 *      description: Retorna uma lista de todos os menus cadastrados
 *      security:
 *        - bearerAuth: []
 *      tags: ["Menus"]
 *      responses:
 *        '200':
 *          description: Sucesso ao retornar os menus
 *        '400':
 *          description: Erro ao retornar os menus
 */
router.get("/", verifyToken, menuController.index);

/**
 * @swagger
 * paths:
 *  /menu:
 *    post:
 *      summary: Cria um novo menu
 *      description: Cria um novo menu com os dados fornecidos e faz o upload de uma imagem
 *      tags: ["Menus"]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                title:
 *                  type: string
 *                description:
 *                  type: string
 *                image:
 *                  type: string
 *                  format: binary
 *                userId:
 *                  type: string
 *                  description: ID do usuário associado ao menu
 *      responses:
 *        '201':
 *          description: Menu criado com sucesso
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  title:
 *                    type: string
 *                  description:
 *                    type: string
 *                  imageUrl:
 *                    type: string
 *                    example: "https://example.com/uploads/menu-image.jpg"
 *                  userId:
 *                    type: string
 *        '400':
 *          description: Falha ao criar menu
 */
router.post("/",  upload.single("image"), menuController.store);


/**
 * @swagger
 * paths:
 *  /menu/{id}:
 *    delete:
 *      summary: Remove um menu pelo ID
 *      description: Remove um menu com base no ID fornecido
 *      security:
 *        - bearerAuth: []
 *      tags: ["Menus"]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID do menu
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Menu removido com sucesso
 *        '404':
 *          description: Menu não encontrado
 */
router.delete("/:id", verifyToken, menuController.remove);

export default router;