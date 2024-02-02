import { Request, Response } from "express";
import LoginUseCase from "../../application/LoginUseCase";
import TokenInterface from "../../application/services/TokenInterface";

export default class LoginController {
  constructor(readonly loginUseCase: LoginUseCase, readonly tokenInterface: TokenInterface) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const user = await this.loginUseCase.run(data.email, data.password);

      if (user) { // Modelo c4, técnica a usar :) - Meta programación
        let token = this.tokenInterface.create_token(user);
        res.status(200).send({
          status: "success",
          data: {
            id: user.id,
            name: user.name,
            email: user.email
          },
        });
      } else {
        res.status(404).send({
          status: "not found",
          data: "No se ha encontrado un usuario las credenciales proporcionadas.",
        });
      }
    } catch (error) {
      res.status(204).send({
        status: "error",
        data: "Ha ocurrido un error durante su petición.",
        msg: error,
      });
    }
  }
}
