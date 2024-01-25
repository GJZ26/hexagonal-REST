import express from "express";
import dotenv from "dotenv";
import userRouter from "./user/infrastructure/UserRouter";
import entryRouter from "./entry/infrastructure/EntryRouter";

dotenv.config();

const server = express();
const server_port = process.env["APP_PORT"] ?? 3030;

server.use(express.json());
server.use("/users", userRouter);
server.use("entries", entryRouter);

server.listen(server_port, () => {
  console.log(`Server listening on http://localhost:${server_port}/`);
});
