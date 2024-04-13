import Author from "./Author";
import AuthorRequest from "./DTOS/AuthorRequest";

export default interface AuthorRepository {
  add(author: AuthorRequest): Promise<Author | null>;
  access(author: AuthorRequest): Promise<Author | null>;
  list(): Promise<Array<Author> | null>;
}
