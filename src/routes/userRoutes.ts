import express from "express";
import * as userController from "../controllers/userController";
import { verifyToken } from "../middlewares/checkAuthJwt";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operações relacionadas aos usuários
 */

/**
 * @swagger
 * paths:
 *  /users:
 *    get:
 *      summary: Retorna todos os usuários
 *      description: Retorna uma lista de todos os usuários cadastrados
 *      security:
 *        - bearerAuth: []
 *      tags: ["Users"]
 *      parameters:
 *       - name: page
 *         in: query
 *         description: Número da página (opcional, o padrão é 1)
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: pageSize
 *         in: query
 *         description: Tamanho da página (opcional, o padrão é 10)
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *      responses:
 *        '200':
 *          description: Sucesso ao retornar os usuários
 *        '400':
 *          description: Error ao retornar os usuários
 */
router.get("/", verifyToken, userController.index);
/**
 * @swagger
 * paths:
 *  /users:
 *    post:
 *      summary: Cria um novo usuário
 *      description: Cria um novo usuário com os dados fornecidos
 *      tags: ["Users"]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        '201':
 *          description: Usuário criado com sucesso
 *        '400':
 *          description: Falha ao criar usuário
 */

router.post("/", userController.store);
/**
 * @swagger
 * paths:
 *  /users/{id}:
 *    get:
 *      summary: Retorna um usuário pelo ID
 *      description: Retorna um usuário com base no ID fornecido
 *      security:
 *        - bearerAuth: []
 *      tags: ["Users"]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID do usuário
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Sucesso ao retornar o usuário
 *        '404':
 *          description: Usuário não encontrado
 */
router.get("/:id", verifyToken, userController.findById);
/**
 * @swagger
 * paths:
 *  /users/{id}:
 *    put:
 *      summary: Atualiza um usuário pelo ID
 *      description: Atualiza um usuário com os dados fornecidos, com base no ID
 *      security:
 *        - bearerAuth: []
 *      tags: ["Users"]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID do usuário
 *          schema:
 *            type: string
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                firstName:
 *                  type: string
 *                lastName:
 *                  type: string
 *                email:
 *                  type: string
 *                password:
 *                  type: string

 *      responses:
 *        '200':
 *          description: Usuário atualizado com sucesso
 *        '404':
 *          description: Usuário não encontrado
 *        '400':
 *          description: Falha ao atualizar usuário
 */
router.put("/:id", verifyToken, userController.update);

/**
 * @swagger
 * paths:
 *  /users/{id}:
 *    delete:
 *      summary: Remove um usuário pelo ID
 *      description: Remove um usuário com base no ID fornecido
 *      security:
 *        - bearerAuth: []
 *      tags: ["Users"]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          description: ID do usuário
 *          schema:
 *            type: string
 *      responses:
 *        '200':
 *          description: Usuário removido com sucesso
 *        '404':
 *          description: Usuário não encontrado
 */
router.delete("/:id", verifyToken, userController.remove);

export default router;
