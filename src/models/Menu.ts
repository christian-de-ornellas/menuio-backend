import { Schema, model, Document, Types } from "mongoose";

interface IMenu extends Document {
    title: string;
    description: string;
    image: string;
    userId: Types.ObjectId;
}

const MenuSchema = new Schema<IMenu>(
    {
        title: { type: String, required: true },
        image: { type: String, required: true },
        description: { type: String, required: true },
        userId: {type: Schema.Types.ObjectId, required: true, ref: "User", select: false },
    },
    { timestamps: true }
);


const Menu = model<IMenu>("Menu", MenuSchema);

export default Menu;
