import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.routes.js";
import productsRouter from "./routes/products.routes.js";
import  commentsRouter from "./routes/comments.routes.js";
import config from "config";
import cors from "cors"

const app = express();
const PORT = config.get("PORT")

app.use(cors())
app.use(express.json());
app.use("/api/auth", authRouter);
app.use(productsRouter);
app.use(commentsRouter)




async function start() {
    await mongoose.connect(config.get("dbURL"))

    try {
        app.listen(PORT, () => {
            console.log("server start on port ", PORT);
        });
    } catch (e) {}
}

start();
