import { Request, Response } from "express";
import RegisterUseCase from "../../application/RegisterUseCase";

export default class RegisterController {
  constructor(readonly registerUseCase: RegisterUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const user = await this.registerUseCase.run(
        data.name,
        data.email,
        data.password
      );

      if (user) {
        res.status(201).send({
          status: "success",
          data: {
            id: user.id,
            name: user.password,
            email: user.email,
          },
        });
      } else {
        res.status(500).send({
          status: "internal server error",
          data: "No se ha podido completar tu petición en este instante.",
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
