import Entry from "../domain/Entry";
import EntryRepository from "../domain/EntryRepository";

export default class CreateUseCase {
  constructor(readonly entryRepository: EntryRepository) {}

  async run(
    title: string,
    content: string,
    author: number
  ): Promise<Entry | null> {
    try {
      const result = await this.entryRepository.create(title, content, author);
      return result;
    } catch {
      return null;
    }
  }
}
