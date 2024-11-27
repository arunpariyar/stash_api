//---- Libraries ----
import express, { Request, Response, Express, NextFunction } from "express";

//----Middleware----
import morgan from "morgan";
import cors from "cors";

//---- Routes ----
import userRouter from "./routes/userRoutes";
import transactionsRouter from "./routes/transactionsRoutes";
import potsRouter from "./routes/potsRoutes";

const server: Express = express();
server.use(express.json());

//CORS CONFIGURATION
const corsConfig = {
  origin: [
    "http://localhost:5173",
    "https://main.d2n81n8tjx6dgr.amplifyapp.com",
  ],
};

//using middlewares
server.use(morgan("common"));
server.use(express.json());
server.use(cors());

// this is just to understand middleware
server.use((req: Request, res: Response, next: NextFunction) => {
  // console.log(req.headers);
  next();
});

//---- Using Routes ----
server.use("/api/v1/users", userRouter);
server.use("/api/v1/transactions", transactionsRouter);

//API Versioning for V2
server.use("/api/v2/transactions", transactionsRouter);
server.use("/api/v2/pots", potsRouter);

server.use("/health", (req: Request, res: Response) => {
  res.send({ message: "Server up and running" });
});

export default server;
