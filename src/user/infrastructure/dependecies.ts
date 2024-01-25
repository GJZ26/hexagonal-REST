import GetByEmailUseCase from "../application/GetByEmailUseCase";
import GetByPkUseCase from "../application/GetByPkUseCase";
import LoginUseCase from "../application/LoginUseCase";
import RegisterUseCase from "../application/RegisterUseCase";
import MySqlUserRepository from "./MysqlUserRepository";
import GetByEmailController from "./controllers/GetByEmailController";
import GetByPkController from "./controllers/GetByPkController";
import LoginController from "./controllers/LoginController";
import RegisterController from "./controllers/RegisterController";

export const mySqlUserRepository = new MySqlUserRepository();

export const getByEmailUseCase = new GetByEmailUseCase(mySqlUserRepository);
export const getByPkUseCase = new GetByPkUseCase(mySqlUserRepository);
export const loginUseCase = new LoginUseCase(mySqlUserRepository);
export const registerUseCase = new RegisterUseCase(mySqlUserRepository);

export const getByEmailController = new GetByEmailController(getByEmailUseCase);
export const getByPkController = new GetByPkController(getByPkUseCase);
export const loginController = new LoginController(loginUseCase);
export const registerController = new RegisterController(registerUseCase);