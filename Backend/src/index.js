import dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose";
import ConnectDB from "./config/db.config.js";
import express from "express"
import app from "./app.js"

const port = process.env.PORT||8080;

ConnectDB().then(()=>{
    app.listen(port,()=>{
        console.log(`server is listening on port ${port}`);
    })
})
