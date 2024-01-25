import CreateUseCase from "../application/CreateUseCase";
import GetByPkUseCase from "../application/GetByPkUseCase";
import ListUseCase from "../application/ListUseCase";
import MySqlEntryRepository from "./MysqlEntryRepository";
import CreateController from "./controllers/CreateController";
import GetByPkController from "./controllers/GetByPkController";
import ListController from "./controllers/ListController";

export const mysqlEntryRepository = new MySqlEntryRepository();

export const createUseCase = new CreateUseCase(mysqlEntryRepository);
export const getByPkUseCase = new GetByPkUseCase(mysqlEntryRepository);
export const listUseCase = new ListUseCase(mysqlEntryRepository);

export const createController = new CreateController(createUseCase);
export const getByPkController = new GetByPkController(getByPkUseCase);
export const listController = new ListController(listUseCase);
