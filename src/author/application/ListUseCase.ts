import AuthorRepository from "../domain/AuthorRepository";
import AuthorDisplay from "../domain/DTOS/AuthorDisplay";

export default class ListUseCase {
  constructor(readonly authorRepository: AuthorRepository) {}
  async run(): Promise<Array<AuthorDisplay> | null> {
    try {
      const result = await this.authorRepository.list();

      if (!result) {
        return null;
      }

      const response: Array<AuthorDisplay> = [];

      result.map((individual) => {
        response.push({
          id: individual.id,
          name: individual.name,
        });
      });

      return response;
    } catch (error) {
      console.log("Ha ocurrido un error con tu petición");
      console.error(error);
      return null;
    }
  }
}
