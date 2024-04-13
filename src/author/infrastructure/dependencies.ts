import AddUseCase from "../application/AddUseCase";
import ListUseCase from "../application/ListUseCase";
import MySqlAuthorRepository from "./MySqlAuthorRepository";
import AddController from "./controllers/AddController";
import ListController from "./controllers/ListController";
import EncryptService from "./helpers/EncryptService";
import TokenService from "./helpers/TokenService";
import { UUIDService } from "./helpers/UUIDService";

export const encryptService = new EncryptService();
export const uuidService = new UUIDService();
export const tokenService = new TokenService();
export const mySqlAuthorRepository = new MySqlAuthorRepository(uuidService);
export const addUseCase = new AddUseCase(
  mySqlAuthorRepository,
  encryptService,
  tokenService
);
export const listUseCase = new ListUseCase(mySqlAuthorRepository);
export const addController = new AddController(addUseCase);
export const listController = new ListController(listUseCase);
