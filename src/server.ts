import { Server } from 'http';
import mongoose from "mongoose";
import app from './app';
import { seedSuperAdmin } from './app/modules/utiles/seedAdminUser';
let server: Server;


const startServer = async () => {
    try {
        await mongoose.connect("mongodb+srv://mongo-node:dgJ3etpgU2DLF31x@cluster0.i1uhr.mongodb.net/ph-tour-management?retryWrites=true&w=majority&appName=Cluster0")
        console.log("Connected To DataBase");
        
        server = app.listen(5000, () => {
            console.log("Server is Running");
        })
    } catch (error) {
        console.log(error);
    }
}


(async () => {
    await startServer();
    await seedSuperAdmin();
})()