import express from "express";
import AddController from "./controllers/AddController";
import { addController, listController } from "./dependencies";

const authorRouter = express.Router();

authorRouter.post("/", addController.run.bind(addController));
authorRouter.get("/", listController.run.bind(listController));

export default authorRouter;
