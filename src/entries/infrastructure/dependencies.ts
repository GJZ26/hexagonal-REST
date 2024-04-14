import CreateUseCase from "../application/CreateUseCase";
import ListUseCase from "../application/ListUseCase";
import MySqlEntryRepository from "./MySqlEntryRepository";
import CreateController from "./controller/CreateController";
import ListController from "./controller/ListController";
import { UUIDService } from "./helpers/UUIDService";

export const uuidService = new UUIDService();

export const mySqlEntryRepository = new MySqlEntryRepository(uuidService);

export const createUseCase = new CreateUseCase(mySqlEntryRepository);
export const listUseCase = new ListUseCase(mySqlEntryRepository);

export const createController = new CreateController(createUseCase);
export const listController = new ListController(listUseCase);
