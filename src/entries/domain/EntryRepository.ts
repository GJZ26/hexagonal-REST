import EntryRequest from "./DTOS/EntryRequest";
import EntryUpdate from "./DTOS/EntryUpdate";
import Entry from "./Entry";

export default interface EntryRepository {
  create(entry: EntryRequest): Promise<Entry | null>;
  list(): Promise<Array<Entry> | null>;
  update(entry: EntryUpdate): Promise<Entry | null>;
}
