import { Request, Response } from "express";
import User from "../models/User";
import { ISendResponse } from "../types/sendResponse";

export const index = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1; // Página padrão é 1
  const pageSize = parseInt(req.query.pageSize as string) || 10; // Tamanho padrão é 10

  try {
    const users = await User.find()
      .skip((page - 1) * pageSize) // Pular resultados da página anterior
      .limit(pageSize); // Limitar o número de resultados por página

    const totalItems = await User.countDocuments(); // Contar o número total de usuários

    const send: ISendResponse = {
      message: "Lista de Usuários",
      items: users,
      structure: {
        fields: [
          { label: "Primeiro", code: "firstName", isVisible: true },
          { label: "Sobrenome", code: "lastName", isVisible: true },
          { label: "E-mail", code: "email", isVisible: true },
          { label: "Senha", code: "password", isVisible: false },
          { label: "Bio", code: "bio", isVisible: true },
          { label: "WhatsApp", code: "cellphone", isVisible: true },
          { label: "Endereço", code: "address", isVisible: false },
          { label: "Cidade", code: "city", isVisible: true },
          { label: "Estado", code: "uf", isVisible: true },
        ],
        filters: [
          {
            label: "Nome",
            field: "firstName",
            operator: [
              { label: "Igual", value: "eq" },
              { label: "Contém", value: "regex" },
            ],
          },
          {
            label: "Sobrenome",
            field: "lastName",
            operator: [
              { label: "Igual", value: "eq" },
              { label: "Contém", value: "regex" },
            ],
          },
          {
            label: "Email",
            field: "email",
            operator: [
              { label: "Igual", value: "eq" },
              { label: "Contém", value: "regex" },
            ],
          },
        ],
      },
      toolbar: { header: "Usuários" },
      page,
      pageSize,
      totalItems,
    };

    res.json(send);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const store = async (req: Request, res: Response) => {
  try {
    const user = new User({ active: true, ...req.body });
    await user.save();

    res.status(201).json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const findById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const send: ISendResponse = {
      message: "Perfil do Usuário",
      items: [user],
      structure: {
        fields: [
          { label: "Primeiro", code: "firstName", isVisible: true },
          { label: "Sobrenome", code: "lastName", isVisible: true },
          { label: "E-mail", code: "email", isVisible: true },
          { label: "Senha", code: "password", isVisible: false },
          { label: "Bio", code: "bio", isVisible: true },
          { label: "WhatsApp", code: "cellphone", isVisible: true },
          { label: "Endereço", code: "address", isVisible: false },
          { label: "Cidade", code: "city", isVisible: true },
          { label: "Estado", code: "uf", isVisible: true },
        ],
        filters: [
          {
            label: "Nome",
            field: "firstName",
            operator: [
              { label: "Igual", value: "eq" },
              { label: "Contém", value: "regex" },
            ],
          },
          {
            label: "Sobrenome",
            field: "lastName",
            operator: [
              { label: "Igual", value: "eq" },
              { label: "Contém", value: "regex" },
            ],
          },
          {
            label: "Email",
            field: "email",
            operator: [
              { label: "Igual", value: "eq" },
              { label: "Contém", value: "regex" },
            ],
          },
        ],
      },
      toolbar: { header: "Usuários" },
    };

    res.json(send);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json(user);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    res.json({ message: "Usuário removido com sucesso" });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};
