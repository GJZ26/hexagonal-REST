import { Request, Response } from "express";
import GetByPkUseCase from "../../application/GetByPkUseCase";

export default class GetByPkController {
  constructor(readonly getByPkUseCase: GetByPkUseCase) {}

  async run(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const entry = await this.getByPkUseCase.run(id);

      if (entry) {
        res.status(200).send({
          status: "success",
          data: {
            id: entry.id,
            title: entry.title,
            content: entry.content,
            author: entry.author
          },
        });
      } else {
        res.status(404).send({
          status: "entry not found",
          data: "No se ha encontrado la entrada solicitada.",
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
