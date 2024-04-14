import { Request, Response } from "express";
import ListUseCase from "../../application/ListUseCase";

export default class ListController {
  constructor(readonly listUseCase: ListUseCase) {}
  async run(req: Request, res: Response) {
    const entries = await this.listUseCase.run();
    if (!entries) {
      return res.status(404).json({
        data: entries,
        msg: "Not entries found",
      });
    }
    return res.status(200).json({
      data: entries,
      msg: "Request success",
    });
  }
}
