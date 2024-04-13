import Author from "../domain/Author";
import AuthorRepository from "../domain/AuthorRepository";
import AuthorRequest from "../domain/DTOS/AuthorRequest";
import AuthorResponse from "../domain/DTOS/AuthorResponse";
import EncryptInterfaces from "./services/EncryptInterface";
import TokenInterface from "./services/TokenInterface";

export default class AddUseCase {
  constructor(
    readonly authorRepository: AuthorRepository,
    readonly encryptInterface: EncryptInterfaces,
    readonly tokenInterface: TokenInterface
  ) {}
  async run(author: AuthorRequest): Promise<AuthorResponse | null> {
    try {
      author.password = this.encryptInterface.hash(author.password);
      let result = await this.authorRepository.add(author);
      if (!result) {
        return null;
      }
      let response: AuthorResponse = {
        id: result.id,
        name: result.name,
        token: this.tokenInterface.generate(author),
      };
      return response;
    } catch (error) {
      console.log("Ha ocurrido un error durante la petición.");
      console.error(error);
      return null;
    }
  }
}
