import { Request, Response } from "express";
import CreateUseCase from "../../application/CreateUseCase";

export default class CreateController {
  constructor(readonly createUseCase: CreateUseCase) {}

  async run(req: Request, res: Response) {
    const data = req.body;
    try {
      const entry = await this.createUseCase.run(
        data.title,
        data.content,
        data.author
      );

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
        res.status(500).send({
          status: "internal server error",
          data: "Ha ocurrido un error con tu peticion, inténtelo más tarde.",
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
