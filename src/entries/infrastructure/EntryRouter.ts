import { Router } from "express";
import { createController, listController } from "./dependencies";

const entryRouter = Router();

entryRouter.post("/", createController.run.bind(createController));
entryRouter.get("/", listController.run.bind(listController));

export default entryRouter;
