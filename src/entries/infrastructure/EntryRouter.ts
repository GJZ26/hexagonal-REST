import { Router } from "express";
import {
  createController,
  getByPkController,
  listController,
  updateController,
} from "./dependencies";

const entryRouter = Router();

entryRouter.post("/", createController.run.bind(createController));
entryRouter.get("/", listController.run.bind(listController));
entryRouter.get("/:id", getByPkController.run.bind(getByPkController));
entryRouter.put("/:id", updateController.run.bind(updateController));

export default entryRouter;
