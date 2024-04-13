import { Request, Response } from "express";
import ListUseCase from "../../application/ListUseCase";

export default class ListController {
  constructor(readonly listUserCase: ListUseCase) {}
  async run(req: Request, res: Response) {
    const result = await this.listUserCase.run();
    if (!result) {
      return res.status(500).json({
        msg: "No se ha podido completar tu petición.",
        data: null,
      });
    }
    return res.status(200).json({
      msg: "Consulta exitosa.",
      data: result,
    });
  }
}
