import {Request, Response} from "express";
import Menu from "../models/Menu";
import {ISendResponse} from "../types/sendResponse";

export const index = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1; // Página padrão é 1
    const pageSize = parseInt(req.query.pageSize as string) || 10; // Tamanho padrão é 10

    try {
        const items = await Menu.find()
            .skip((page - 1) * pageSize) // Pular resultados da página anterior
            .limit(pageSize); // Limitar o número de resultados por página

        const totalItems = await Menu.countDocuments(); // Contar o número total de usuários

        const send: ISendResponse = {
            message: "Lista de itens do cardápio",
            items,
            structure: {
                fields: [
                    {label: "Primeiro", code: "firstName", isVisible: true},
                    {label: "Sobrenome", code: "lastName", isVisible: true},
                    {label: "E-mail", code: "email", isVisible: true},
                ],
                filters: [
                    {
                        label: "Nome",
                        field: "firstName",
                        operator: [
                            {label: "Igual", value: "eq"},
                            {label: "Contém", value: "regex"},
                        ],
                    },
                    {
                        label: "Sobrenome",
                        field: "lastName",
                        operator: [
                            {label: "Igual", value: "eq"},
                            {label: "Contém", value: "regex"},
                        ],
                    },
                    {
                        label: "Email",
                        field: "email",
                        operator: [
                            {label: "Igual", value: "eq"},
                            {label: "Contém", value: "regex"},
                        ],
                    },
                ],
            },
            toolbar: {header: "Usuários"},
            page,
            pageSize,
            totalItems,
        };

        res.json(send);
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
};

export const store = async (req: Request, res: Response) => {
    try {
        const { title, description,userId } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const menu = new Menu({
            title,
            description,
            image: imageUrl,
            userId,
        });

        await menu.save();

        res.status(201).json({message:"Item cadastrado com sucesso!"});
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const user = await Menu.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({message: "Usuário não encontrado"});
        }
        res.json({message: "Usuário removido com sucesso"});
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
};
