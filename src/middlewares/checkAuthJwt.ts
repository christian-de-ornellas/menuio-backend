import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Define the payload type for your JWT
interface JwtPayload {
  userId: string;
  // Add any other properties you include in the JWT payload
}

// Extend the Request type to include the 'user' property
declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

// Chave secreta para assinar e verificar tokens
const secretKey = "@#$%J3sus";

// Função para gerar um token JWT
export const generateToken = (payload: any): string => {
  return jwt.sign(payload, secretKey, { expiresIn: "24h" });
};

// Middleware para verificar o token JWT
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não fornecido" });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(403)
        .json({ message: "Falha na autenticação do token" });
    }

    // Cast the decoded payload to the JwtPayload type
    req.user = decoded as JwtPayload;
    next();
  });
};
