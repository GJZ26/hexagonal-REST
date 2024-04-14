import { Request, Response } from "express";
import UpdateUseCase from "../../application/UpdateUseCase";

export default class UpdateController {
  constructor(readonly updateUseCase: UpdateUseCase) {}
  async run(req: Request, res: Response) {
    const result = await this.updateUseCase.run({
      id: req.params.id,
      title: req.body.title,
      content: req.body.content,
    });

    if (!result) {
      return res.status(500).json({
        data: result,
        msg: "Entry not found.",
      });
    }

    return res.status(200).json({
      data: result,
      msg: "Entry updated succesfully",
    });

  }
}
