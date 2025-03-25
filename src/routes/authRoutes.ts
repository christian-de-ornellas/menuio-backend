import express from "express";
import * as authController from "../controllers/authController";

const router = express.Router();
/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Operações relacionadas ao login
 */

/**
 * @swagger
 *  /login:
 *    post:
 *      summary: Logar no sistema
 *      description: Autenticação de usuários
 *      tags: ["Authentication"]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *      responses:
 *        '201':
 *          description: Login realizado com sucesso
 *        '401':
 *          description: Falha ao realizar o login
 */
router.post("/", authController.login);

export default router;
