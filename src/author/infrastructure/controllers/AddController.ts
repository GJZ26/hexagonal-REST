import { Request, Response } from "express";
import AddUseCase from "../../application/AddUseCase";
import AuthorRequest from "../../domain/DTOS/AuthorRequest";

export default class AddController {
  constructor(readonly addUseCase: AddUseCase) {}
  async run(req: Request, res: Response) {
    const request: AuthorRequest = {
      name: req.body.name ?? "Anonymouse",
      email: req.body.email ?? "No Email",
      password: req.body.password ?? "No Password",
    };

    try {
      const authorSaved = await this.addUseCase.run(request);

      if (!authorSaved) {
        console.log("Ha ocurrido un error durante tu petición");
        return res.status(500).json({
          data: null,
          msg: "User not saved",
        });
      }

      return res.status(201).json({
        data: authorSaved,
        msg: "User registered succesfully",
      });
      
    } catch (error) {
      console.log("Ha ocurrido un error durante tu petición");
      console.error(error);
      return res.status(500).json({
        data: null,
        msg: error,
      });
    }
  }
}
