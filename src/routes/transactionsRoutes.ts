import express, { Router } from "express";
import transactionsController from "../controllers/transactionsController";
import { protectRoute } from "../middlewares/middlewares";

const transactionsRouter: Router = express.Router();

transactionsRouter.route("/").get(transactionsController.getAllTransactions);
//TODO add the protection to the route at a latter time .get(protectRoute, transactionsController.getAllTransactions);

export default transactionsRouter;
