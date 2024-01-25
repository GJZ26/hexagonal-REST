import Entry from "./Entry";

export default interface EntryRepository {
  list(): Promise<Entry[] | null>;
  get_by_pk(id:number): Promise<Entry | null>;
  create(title: string, content: string, author: number): Promise<Entry | null>;
}
