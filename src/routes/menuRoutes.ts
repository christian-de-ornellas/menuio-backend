import express from "express";
import * as menuController from "../controllers/menuController";
import { verifyToken } from "../middlewares/checkAuthJwt";
import upload from "../libs/multer/multerConfig";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Menu
 *   description: Operações relacionadas aos itens do menu
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Menu:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "607f1f77bcf86cd799439011"
 *         title:
 *           type: string
 *           example: "Pizza Margherita"
 *         description:
 *           type: string
 *           example: "Deliciosa pizza com molho de tomate, mussarela e manjericão"
 *         image:
 *           type: string
 *           example: "uploads/pizza.jpg"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-04-05T12:34:56.789Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: "2024-04-05T12:34:56.789Z"
 */

/**
 * @swagger
 * /menu:
 *   get:
 *     summary: Retorna todos os menus
 *     description: Retorna uma lista paginada de todos os menus cadastrados
 *     security:
 *       - bearerAuth: []
 *     tags: ["Menu"]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Página atual da lista
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Quantidade de itens por página
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Filtro para buscar menus pelo título
 *     responses:
 *       '200':
 *         description: Sucesso ao retornar os menus
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 items:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Menu'
 *                 structure:
 *                   type: object
 *                 toolbar:
 *                   type: object
 *                 page:
 *                   type: integer
 *                 pageSize:
 *                   type: integer
 *                 totalItems:
 *                   type: integer
 *       '400':
 *         description: Erro ao retornar os menus
 */
router.get("/", menuController.index);

/**
 * @swagger
 * /menu:
 *   post:
 *     summary: Cria um novo menu
 *     description: Cria um novo menu com os dados fornecidos e faz o upload de uma imagem
 *     tags: ["Menu"]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *               userId:
 *                 type: string
 *                 description: ID do usuário associado ao menu
 *     responses:
 *       '201':
 *         description: Menu criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 imageUrl:
 *                   type: string
 *                   example: "https://example.com/uploads/menu-image.jpg"
 *                 userId:
 *                   type: string
 *       '400':
 *         description: Falha ao criar menu
 */
router.post("/", upload.single("image"), menuController.store);

/**
 * @swagger
 * /menu/{id}:
 *   delete:
 *     summary: Remove um menu pelo ID
 *     description: Remove um menu com base no ID fornecido
 *     security:
 *       - bearerAuth: []
 *     tags: ["Menu"]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do menu
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Menu removido com sucesso
 *       '404':
 *         description: Menu não encontrado
 */
router.delete("/:id", verifyToken, menuController.remove);

export default router;