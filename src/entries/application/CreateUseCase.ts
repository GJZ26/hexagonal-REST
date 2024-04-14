import EntryRequest from "../domain/DTOS/EntryRequest";
import EntryRepository from "../domain/EntryRepository";

export default class CreateUseCase {
  constructor(readonly entryRepository: EntryRepository) {}
  async run(entry: EntryRequest) {
    const entryAdded = await this.entryRepository.create(entry);
    if (!entryAdded) {
      return null;
    }
    return entryAdded;
  }
}
