import Entry from "../domain/Entry";
import EntryRepository from "../domain/EntryRepository";

export default class GetByPkUseCase {
  constructor(readonly entryRepository: EntryRepository) {}

  async run(id: number): Promise<Entry | null> {
    try {
      const result = await this.entryRepository.get_by_pk(id);
      return result;
    } catch {
      return null;
    }
  }
}
