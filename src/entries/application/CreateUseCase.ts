import EntryRequest from "../domain/DTOS/EntryRequest";
import EntryRepository from "../domain/EntryRepository";
import UUIDInterface from "./services/UUIDInterface";

export default class CreateUseCase {
  constructor(readonly entryRepository: EntryRepository, readonly uuidService: UUIDInterface) {}
  async run(entry: EntryRequest) {
    entry.id = this.uuidService.get_uuid()
    const entryAdded = await this.entryRepository.create(entry);
    if (!entryAdded) {
      return null;
    }
    return entryAdded;
  }
}
