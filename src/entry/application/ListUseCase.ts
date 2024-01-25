import Entry from "../domain/Entry";
import EntryRepository from "../domain/EntryRepository";

export default class ListUseCase {
  constructor(readonly entryRepository: EntryRepository) {}

  async run(): Promise<Entry[] | null> {
    try {
      const result = await this.entryRepository.list();
      return result;
    } catch {
      return null;
    }
  }
}
