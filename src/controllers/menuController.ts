import {Request, Response} from "express";
import Menu from "../models/Menu";
import {ISendResponse} from "../types/sendResponse";
import fs from "fs";
import path from "path";

export const index = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    try {
        const items = await Menu.find()
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        const totalItems = await Menu.countDocuments();

        const send: ISendResponse = {
            message: "Lista de itens do cardápio",
            items,
            structure: {
                fields: [
                    {label: "Título", code: "title", isVisible: true},
                    {label: "Descrição", code: "description", isVisible: true},
                    {label: "Imagem", code: "image", isVisible: true},
                ],

            },
            toolbar: {header: "Cardápio"},
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
        const {title, description, userId} = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const menu = new Menu({
            title,
            description,
            image: imageUrl,
            userId,
        });

        await menu.save();

        res.status(201).json({message: "Item cadastrado com sucesso!"});
    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const menu = await Menu.findById(req.params.id);
        if (!menu) {
            return res.status(404).json({message: "Menu não encontrado"});
        }

        if (menu?.image) {
            const imagePath = path?.join(__dirname, "../../", menu?.image);

            if (fs?.existsSync(imagePath)) {
                fs?.unlinkSync(imagePath);
            }
        }

        await Menu.findByIdAndDelete(req.params.id);
        res.json({message: "Menu removido com sucesso"});

    } catch (error: any) {
        res.status(400).json({message: error.message});
    }
};
