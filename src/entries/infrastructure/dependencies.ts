import CreateUseCase from "../application/CreateUseCase";
import GetByPkUseCase from "../application/GetByPkUseCase";
import ListUseCase from "../application/ListUseCase";
import UpdateUseCase from "../application/UpdateUseCase";
import MySqlEntryRepository from "./MySqlEntryRepository";
import CreateController from "./controller/CreateController";
import GetByPkController from "./controller/GetByPkController";
import ListController from "./controller/ListController";
import UpdateController from "./controller/UpdateController";
import { UUIDService } from "./helpers/UUIDService";

export const uuidService = new UUIDService();

export const mySqlEntryRepository = new MySqlEntryRepository();

export const createUseCase = new CreateUseCase(mySqlEntryRepository,uuidService);
export const listUseCase = new ListUseCase(mySqlEntryRepository);
export const updateUseCase = new UpdateUseCase(mySqlEntryRepository);
export const getByPkUseCase = new GetByPkUseCase(mySqlEntryRepository)

export const createController = new CreateController(createUseCase);
export const listController = new ListController(listUseCase);
export const updateController = new UpdateController(updateUseCase);
export const getByPkController = new GetByPkController(getByPkUseCase)