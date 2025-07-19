import express, { Request, Response } from "express";
import cors from 'cors';
import { router } from "./app/modules/routes";
import { globalErrorHandler } from "./app/modules/middleswares/globalErrorHandlers";
import notFound from "./app/modules/middleswares/notFound";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/api/v1", router);

app.get("/", (req: Request , res : Response) => {
    res.status(200).json({
        message : "Welcome to Mongo Node Server"
    })
})

app.use(globalErrorHandler);
app.use(notFound);  

export default app;