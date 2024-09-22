import mongoose from "mongoose"

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://saltyku:YEsXGmu417Qp7vna@cluster0.2wsy4.mongodb.net/website-store').then(() => console.log("DB Connected"));
}