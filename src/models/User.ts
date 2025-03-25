import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

interface UserInterface extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cref: string;
  group: "admin" | "root";
  active: boolean;
  document?: string | null;
  bio?: string;
  cellphone: string;
  cep?: string;
  address?: string;
  n?: number;
  complement?: string;
  neighborhood?: string;
  city?: string;
  uf?: string;
}

const UserSchema = new Schema<UserInterface>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cref: { type: String, required: true },
    group: {
      type: String,
      enum: {
        values: ["admin", "root"],
        message: "Erro, consulte ao administrador do sistema", // Mensagem personalizada
      },
      required: [true, "Você não tem permissão para realizar está ação!"], // Mensagem personalizada
    },
    active: { type: Boolean, required: true },
    document: { type: String, default: null },
    bio: { type: String, required: false },
    cellphone: { type: String, required: true },
    cep: { type: String, required: false },
    address: { type: String, required: false },
    n: { type: Number, required: false },
    complement: { type: String, required: false },
    neighborhood: { type: String, required: false },
    city: { type: String, required: false },
    uf: { type: String, required: false },
  },
  { timestamps: true }
);

// Middleware pré-salvar para criptografar a senha
UserSchema.pre<UserInterface>("save", async function (next) {
  try {
    const user = this;

    // Verifica se a senha foi modificada ou é nova
    if (!user.isModified("password")) return next();

    // Gera o salt
    const salt = await bcrypt.genSalt(10);

    // Criptografa a senha com o salt
    user.password = await bcrypt.hash(user.password, salt);

    // Define campo 'document' como null se for uma string vazia
    if (user.document === "") {
      user.document = null;
    }

    next();
  } catch (error: any) {
    next(error);
  }
});

// Middleware para formatação de mensagem de erro
UserSchema.post("save", function (error: any, doc: any, next: any) {
  if (error.name === "ValidationError") {
    const customError = {
      message: Object.values(error.errors)
        .map((err: any) => err.message)
        .join(", "),
    };
    next(customError);
  } else {
    next(error);
  }
});

const User = model<UserInterface>("User", UserSchema);

export default User;
