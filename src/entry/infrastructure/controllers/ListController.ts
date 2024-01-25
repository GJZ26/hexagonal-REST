import { Request, Response } from "express";
import ListUseCase from "../../application/ListUseCase";

export default class ListController {
  constructor(readonly listUseCase: ListUseCase) {}

  async run(req: Request, res: Response) {
    try {
      const entries = await this.listUseCase.run();

      if (entries) {
        res.status(200).send({
          status: "success",
          data: entries.map((entry: any) => {
            return {
              id: entry.id,
              title: entry.title,
              content: entry.content,
              author: entry.author,
            };
          }),
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
