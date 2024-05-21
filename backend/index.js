// chats
import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/database.js";
import userRoute from  "./routes/userRoute.js"
import messageRoute from  "./routes/messageRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";
dotenv.config({});


const PORT=process.env.PORT;

//middlewares
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser());
const corsOption={
    origin:"http://localhost:3000",
    credentials:true
}
app.use(cors(corsOption));

// routes
app.use("/api/user",userRoute)
app.use("/api/message",messageRoute)

server.listen(PORT,()=>{
    connectDb();
    console.log(`Server started at port number ${PORT}`)
})