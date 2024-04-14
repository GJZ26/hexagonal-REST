import { Request, Response } from "express";
import AccessUseCase from "../../application/AccessUseCase";
import AuthorRequest from "../../domain/DTOS/AuthorRequest";

export default class AccessController {
  constructor(readonly authorUseCase: AccessUseCase) {}
  async run(req: Request, res: Response) {
    const authorRequested: AuthorRequest = {
      name: "",
      email: req.body.email ?? "",
      password: req.body.password ?? "",
    };

    const author_founded = await this.authorUseCase.run(authorRequested);
    if (!author_founded) {
      return res.status(404).json({
        data: author_founded,
        msg: "Credentials doesn't match",
      });
    }

    return res.status(200).json({
      data: author_founded,
      msg: "Authentication success",
    });
  }
}
