import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import authorRouter from "./author/infrastructure/AuthorRouter";
import entryRouter from "./entries/infrastructure/EntryRouter";

dotenv.config();

const APP_PORT = process.env["APP_PORT"] ?? 3030;

const server = express();

server.use(cors());
server.use(express.json());

server.use("/authors", authorRouter);
server.use("/entries", entryRouter);

server.listen(APP_PORT, () => {
  console.clear()
  console.log(`\n-> API listening on http://127.0.0.1:${APP_PORT}/`);
});
