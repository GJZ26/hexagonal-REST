import { Router } from "express";
import {
  createController,
  listController,
  updateController,
} from "./dependencies";

const entryRouter = Router();

entryRouter.post("/", createController.run.bind(createController));
entryRouter.get("/", listController.run.bind(listController));
entryRouter.put("/:id", updateController.run.bind(updateController));

export default entryRouter;
