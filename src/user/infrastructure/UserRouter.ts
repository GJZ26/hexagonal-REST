import express from "express";
import {
  getByEmailController,
  getByPkController,
  loginController,
  registerController,
} from "./dependecies";

const userRouter = express.Router();

userRouter.get("/", getByEmailController.run.bind(getByEmailController));
userRouter.get("/:id", getByPkController.run.bind(getByPkController));

userRouter.post("/login", loginController.run.bind(loginController));
userRouter.post("/register", registerController.run.bind(registerController));

export default userRouter;
