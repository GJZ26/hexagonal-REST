import AccessUseCase from "../application/AccessUseCase";
import AddUseCase from "../application/AddUseCase";
import ListUseCase from "../application/ListUseCase";
import MySqlAuthorRepository from "./MySqlAuthorRepository";
import AccessController from "./controllers/AccessController";
import AddController from "./controllers/AddController";
import ListController from "./controllers/ListController";
import EncryptService from "./helpers/EncryptService";
import TokenService from "./helpers/TokenService";
import { UUIDService } from "./helpers/UUIDService";

/* SERVICES */
export const encryptService = new EncryptService();
export const uuidService = new UUIDService();
export const tokenService = new TokenService();
/* RESPOSITORY */
export const mySqlAuthorRepository = new MySqlAuthorRepository(uuidService);
/* USES CASE */
export const addUseCase = new AddUseCase(
  mySqlAuthorRepository,
  encryptService,
  tokenService
);
export const listUseCase = new ListUseCase(mySqlAuthorRepository);
export const accessUseCase = new AccessUseCase(
  tokenService,
  encryptService,
  mySqlAuthorRepository
);
/* CONTROLLERS */
export const addController = new AddController(addUseCase);
export const listController = new ListController(listUseCase);
export const accessController = new AccessController(accessUseCase);