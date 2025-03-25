import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

interface UserInterface extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<UserInterface>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
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
