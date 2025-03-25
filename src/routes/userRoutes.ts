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
router.get("/", verifyToken, userController.getAllUsers);
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
 *                cellphone:
 *                  type: string
 *                cref:
 *                  type: string
 *      responses:
 *        '201':
 *          description: Usuário criado com sucesso
 *        '400':
 *          description: Falha ao criar usuário
 */

router.post("/", userController.createUser);
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
router.get("/:id", verifyToken, userController.getUserById);
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
 *                cref:
 *                  type: string
 *                  description: Cref do usuário
 *                cellphone:
 *                  type: string
 *                  description: Número de telefone (opcional)
 *                cep:
 *                  type: string
 *                  description: Cep do usuário (opcional)
 *                address:
 *                  type: string
 *                  description: Endereço do usuário (opcional)
 *                n:
 *                  type: number
 *                  description: número do usuário (opcional)
 *                complement:
 *                  type: string
 *                  description: Complemento do usuário (opcional)
 *                neighborhood:
 *                  type: string
 *                  description: Bairro do usuário (opcional)
 *                city:
 *                  type: string
 *                  description: Cidade do usuário (opcional)
 *                uf:
 *                  type: string
 *                  description: Unidade Federativa do usuário (opcional)
 *                bio:
 *                  type: string
 *                  description: Biografia do usuário (opcional)
 *      responses:
 *        '200':
 *          description: Usuário atualizado com sucesso
 *        '404':
 *          description: Usuário não encontrado
 *        '400':
 *          description: Falha ao atualizar usuário
 */
router.put("/:id", verifyToken, userController.updateUser);

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
router.delete("/:id", verifyToken, userController.deleteUser);

export default router;
