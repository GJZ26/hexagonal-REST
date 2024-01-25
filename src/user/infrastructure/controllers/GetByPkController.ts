import { Request, Response } from "express";
import GetByPkUseCase from "../../application/GetByPkUseCase";

export default class GetByPkController {
  constructor(readonly getByPkUseCase: GetByPkUseCase) {}

  async run(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const user = await this.getByPkUseCase.run(id);

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
          data: "No se ha encontrado un usuario con el id dado.",
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
