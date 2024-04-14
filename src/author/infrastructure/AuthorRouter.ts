import express from "express";
import {
  accessController,
  addController,
  listController,
} from "./dependencies";

const authorRouter = express.Router();

authorRouter.post("/", addController.run.bind(addController));
authorRouter.get("/", listController.run.bind(listController));
authorRouter.post("/access", accessController.run.bind(accessController));

export default authorRouter;
