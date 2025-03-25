import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }, { password: 1 });
        if (!user) {
            return res.status(401).send({ error: "E-mail e ou senha inválida!" });
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send({ error: "E-mail e ou senha inválida!" });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, "@#$%J3sus", {
            expiresIn: "24h", // Set an appropriate expiration time
        });

        // Exclude password before sending the response
        user.password = "";

        // busca dos dados do user
        const profile = await User.findOne({ email }).select("-password");

        res.status(200).json({ token, profile });
    } catch (error: any) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
