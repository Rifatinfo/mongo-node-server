import { Server } from 'http';
import mongoose from "mongoose";
import app from './app';
import { seedSuperAdmin } from './app/modules/utiles/seedAdminUser';
import { connectRedis } from './app/modules/config/redis.config';

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
    await connectRedis();
    await startServer();
    await seedSuperAdmin();
})()

process.on("SIGTERM", () => {
    console.log("SIGTERM signal received detected... Server shut down");

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
})
process.on("SIGINT", () => {
    console.log("SIGINT signal received detected... Server shut down");

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
})

process.on("unhandledRejection", () => {
    console.log("UnHandle Rejection detected... Server shut down");

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
})
process.on("uncaughtException", () => {
    console.log("uncaughtException detected... Server shut down");

    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
})