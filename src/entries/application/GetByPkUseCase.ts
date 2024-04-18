import EntryResponse from "../domain/DTOS/EntryResponse";
import EntryRepository from "../domain/EntryRepository";

export default class GetByPkUseCase {
  constructor(readonly repository: EntryRepository) {}
  async run(pk: string) {
    const result = await this.repository.getByPk(pk);
    if(result === null) return result;

    const response:EntryResponse = {
      id: result.id,
      title: result.title,
      content: result.content,
      author_name: result.author_name!
    }

    return response
  }
}