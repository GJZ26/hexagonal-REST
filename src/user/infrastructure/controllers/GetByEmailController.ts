import { Request, Response } from "express";
import GetByEmailUseCase from "../../application/GetByEmailUseCase";

export default class GetByEmailController {
  constructor(readonly getByEmailUseCase: GetByEmailUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const user = await this.getByEmailUseCase.run(data.email);

      if (user) {
        res.status(200).send({
          status: "success",
          data: {
            id: user.id,
            name: user.password,
            email: user.email,
          },
        });
      } else {
        res.status(404).send({
          status: "not found",
          data: "No se ha encontrado un usuario con el correo dado.",
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
