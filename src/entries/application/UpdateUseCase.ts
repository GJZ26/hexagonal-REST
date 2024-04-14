import EntryResponse from "../domain/DTOS/EntryResponse";
import EntryUpdate from "../domain/DTOS/EntryUpdate";
import EntryRepository from "../domain/EntryRepository";

export default class UpdateUseCase {
  constructor(readonly entryRepository: EntryRepository) {}
  async run(entry: EntryUpdate): Promise<EntryResponse | null> {
    const result = await this.entryRepository.update(entry);
    if (!result) {
      return null;
    }
    const reponse: EntryResponse = {
      title: result.title,
      content: result.content,
      id: result.id,
      author_name: result.author_name ?? "Sabeee",
    };
    return reponse;
  }
}
