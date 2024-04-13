import query from "../../database/connection";
import UUIDInterface from "../application/services/UUIDInterface";
import Author from "../domain/Author";
import AuthorRepository from "../domain/AuthorRepository";
import AuthorRequest from "../domain/DTOS/AuthorRequest";

export default class MySqlAuthorRepository implements AuthorRepository {
  constructor(readonly uuidService: UUIDInterface) {}

  async list(): Promise<Array<Author> | null> {
    const sentence = "SELECT * FROM authors";
    try {
      const [results]: any = await query(sentence, []);
      const response: Array<Author> = [];
      if (results === null || results.length == 0) {
        return null;
      }

      results.map((individual: any)=>{
          response.push({
            name: individual.name,
            id: individual.id,
            email: individual.email,
            password: "[HIDDEN]"
          })
      })

      return response;
    } catch (error) {
      console.log("Ha ocurrido un error con su petición.");
      console.error(error);
      return null;
    }
  }

  private async get_by_email(email: string): Promise<Author | null> {
    const sentence = "SELECT * FROM authors WHERE email = ? LIMIT 1";
    const params: string[] = [email];
    try {
      const [result]: any = await query(sentence, params);

      if (result === null || result.length === 0) {
        return null;
      }

      const response: Author = {
        id: result.id,
        name: result.name,
        email: result.email,
        password: "[HIDDEN]",
      };

      return response;
    } catch (error) {
      console.log("Error en la consulta.");
      console.error(error);
      return null;
    }
  }

  async add(author: AuthorRequest): Promise<Author | null> {
    const sentence =
      "INSERT INTO authors (id, name, email, password) VALUES (?, ?, ?, ?)";
    const params: string[] = [
      this.uuidService.get_uuid(),
      author.name!,
      author.email,
      "[HIDDEN]",
    ];

    try {
      const users_registered = await this.get_by_email(author.email);

      if (users_registered !== null) {
        console.log("El usuario con este correo ya existe.");
        return null;
      }

      const [result]: any = await query(sentence, params);

      if (!result || result.length === 0) {
        return null;
      }

      const response: Author = {
        id: params[0],
        name: author.name!,
        email: author.email,
        password: "[HIDDEN]",
      };

      console.log("User added");
      return response;
    } catch (error) {
      console.log("Ha ocurrido un error durante la petición.");
      console.error(error);
      return null;
    }
  }
  access(author: AuthorRequest): Promise<Author | null> {
    throw new Error("Method not implemented.");
  }
}
