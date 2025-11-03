import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 4000;
export const MONGO_URI = process.env.MONGO_URI|| "mongodb+srv://kunalkmr71_db_user:Kunal123@cluster0.0skegol.mongodb.net/product?retryWrites=true&w=majority&appName=Cluster0";
export const NODE_ENV = process.env.NODE_ENV || "development";
