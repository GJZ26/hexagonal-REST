import { Request, Response } from "express";
import GetByPkUseCase from "../../application/GetByPkUseCase";

export default class GetByPkController {
  constructor(readonly useCase: GetByPkUseCase) {}
  async run(req: Request, res: Response) {
    const result = await this.useCase.run(req.params.id);
    if (result === null) {
      return res.status(404).json({
        msg: "Entry not found",
        data: null,
      });
    }

    return res.status(200).json({
      msg: "Entry found.",
      data: result,
    });
  }
}
