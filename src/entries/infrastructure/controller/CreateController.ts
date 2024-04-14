import { Request, Response } from "express";
import CreateUseCase from "../../application/CreateUseCase";
import EntryRequest from "../../domain/DTOS/EntryRequest";

export default class CreateController {
  constructor(readonly createUseCase: CreateUseCase) {}
  async run(req: Request, res: Response) {
    const entry: EntryRequest = {
      title: req.body.title,
      content: req.body.content,
      author_id: req.body.author_id,
    };
    const result = await this.createUseCase.run(entry);
    if (!result) {
      return res.status(500).json({
        data: result,
        msg: "No se pudo crear la entrada.",
      });
    }

    return res.status(201).json({
      data: result,
      msg: "Entrada creada con éxito.",
    });
  }
}
