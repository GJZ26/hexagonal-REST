import EntryResponse from "../domain/DTOS/EntryResponse";
import EntryRepository from "../domain/EntryRepository";

export default class ListUseCase {
  constructor(readonly entryRepository: EntryRepository) {}
  async run(): Promise<Array<EntryResponse> | null> {
    const result = await this.entryRepository.list();
    if (!result) {
      return null;
    }
    const response: Array<EntryResponse> = [];
    result.map((entry) => {
      response.push({
        id: entry.id,
        title: entry.title,
        content: entry.content,
        author_name: entry.author_name!,
      });
    });
    return response;
  }
}
