import express, { Router } from "express";
import potController from "../controllers/potsController";

const potsRouter: Router = express.Router();

potsRouter
  .route("/")
  .get(potController.getAllPots)
  .post(potController.createPot);

potsRouter.route("/:id").delete(potController.deletePot);
//TODO add the protection to the route at a latter time .get(protectRoute, transactionsController.getAllTransactions);

export default potsRouter;
