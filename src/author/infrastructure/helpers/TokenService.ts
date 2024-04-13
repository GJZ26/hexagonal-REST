import TokenInterface from "../../application/services/TokenInterface";
import AuthorRequest from "../../domain/DTOS/AuthorRequest";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default class TokenService implements TokenInterface {
  generate(author: AuthorRequest): string {
    return jwt.sign(
      {
        name: author.name,
      },
      process.env["JWT_SECRET"] ?? "DEFAULT_SECRET",
      {
        algorithm: "HS256",
      }
    );
  }
  validate(token: string): boolean {
    try {
      const rest = jwt.verify(
        token,
        process.env["JWT_SECRET"] ?? "DEFAULT_SECRET",
        {
          algorithms: ["HS256"],
        }
      );
      console.log(rest);
      return true;
    } catch (error) {
      console.log("Token inválido");
      return false;
    }
  }
}
