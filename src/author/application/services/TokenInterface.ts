import AuthorRequest from "../../domain/DTOS/AuthorRequest";

export default interface TokenInterface {
  generate(author: AuthorRequest): string;
  validate(token: string): boolean;
}
