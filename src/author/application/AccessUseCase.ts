import AuthorRepository from "../domain/AuthorRepository";
import AuthorRequest from "../domain/DTOS/AuthorRequest";
import AuthorResponse from "../domain/DTOS/AuthorResponse";
import EncryptInterfaces from "./services/EncryptInterface";
import TokenInterface from "./services/TokenInterface";

export default class AccessUseCase {
  constructor(
    readonly tokenService: TokenInterface,
    readonly encrypService: EncryptInterfaces,
    readonly authorRepository: AuthorRepository
  ) {}
  async run(author: AuthorRequest): Promise<AuthorResponse | null> {
    const authorFounded = await this.authorRepository.access(author);

    if (!authorFounded) {
      return null;
    }

    if (!this.encrypService.compare(authorFounded.password, author.password)) {
      return null;
    }

    const response: AuthorResponse = {
      name: authorFounded.name,
      id: authorFounded.id,
      token: this.tokenService.generate(author),
    };

    return response;
  }
}
