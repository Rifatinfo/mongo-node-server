import { Server } from 'http';
import mongoose from "mongoose";
import app from './app';
let server: Server;


const startServer = async () => {
    try {
        await mongoose.connect("mongodb+srv://ph-tour-management-system:kxrC6SFgRZa0FrPj@cluster0.i1uhr.mongodb.net/ph-tour-management?retryWrites=true&w=majority&appName=Cluster0")
        server = app.listen(5000, () => {
            console.log("Server is Running");
        })
    } catch (error) {
        console.log(error);
    }
}

startServer();

