import query from "../../database/connection";
import Entry from "../domain/Entry";
import EntryRepository from "../domain/EntryRepository";

export default class MySqlEntryRepository implements EntryRepository {
  async list(): Promise<Entry[] | null> {
    const sql = "SELECT * FROM entry";
    try {
      const [data]: any = await query(sql, []);
      const data_parsed = Object.values(JSON.parse(JSON.stringify(data)));

      return data_parsed.map(
        (entry: any) =>
          new Entry(entry.id, entry.name, entry.description, entry.price)
      );
    } catch (error) {
      return null;
    }
  }

  async get_by_pk(id: number): Promise<Entry | null> {
    const sql = "SELECT * FROM entry WHERE id=?";
    const params: any[] = [id];

    try {
      const [result]: any = await query(sql, params);
      return new Entry(
        result[0].id,
        result[0].title,
        result[0].content,
        result[0].author
      );
    } catch (error) {
      return null;
    }
  }

  async create(
    title: string,
    content: string,
    author: number
  ): Promise<Entry | null> {
    const sql = "INSERT INTO entry (title, content, author) VALUES (?, ?, ?)";
    const params: any[] = [title, content, author];
    try {
      const [result]: any = await query(sql, params);

      return new Entry(result.insertId, title, content, author);
    } catch (error) {
      return null;
    }
  }
}
