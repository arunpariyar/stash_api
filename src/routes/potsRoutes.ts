import express, { Router } from "express";
import potController from "../controllers/potsController";

const potsRouter: Router = express.Router();

potsRouter
  .route("/")
  .get(potController.getAllPots)
  .post(potController.createPot);

potsRouter
  .route("/:id")
  .get(potController.getOnePot)
  .delete(potController.deletePot)
  .patch(potController.updatePot);
//TODO add the protection to the route at a latter time .get(protectRoute, transactionsController.getAllTransactions);

potsRouter.route("/:id/add").post(potController.addMoneyToPot);
potsRouter.route("/:id/withdraw").post(potController.withdrawFromPot);

//TODO add the protection to the route at a latter time .get(protectRoute, transactionsController.getAllTransactions);

export default potsRouter;
