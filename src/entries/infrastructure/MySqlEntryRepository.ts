import query from "../../database/connection";
import UUIDInterface from "../application/services/UUIDInterface";
import EntryRequest from "../domain/DTOS/EntryRequest";
import EntryUpdate from "../domain/DTOS/EntryUpdate";
import Entry from "../domain/Entry";
import EntryRepository from "../domain/EntryRepository";

export default class MySqlEntryRepository implements EntryRepository {
  constructor(readonly uuidService: UUIDInterface) {}

  async create(entry: EntryRequest): Promise<Entry | null> {
    const sentence =
      "INSERT INTO entries(id, author_id, title, content) VALUES(?,?,?,?)";
    const params: string[] = [
      this.uuidService.get_uuid(),
      entry.author_id,
      entry.title,
      entry.content,
    ];
    try {
      const [result]: any = await query(sentence, params);

      if (!result || result.length === 0) {
        console.log("No se pudo completar el registro de tu entrada.");
        return null;
      }

      const response: Entry = {
        title: entry.title,
        content: entry.title,
        author_id: entry.author_id,
        id: params[0],
      };

      return response;
    } catch (error) {
      console.log("Ha ocurrido un error durante la consulta.");
      console.error(error);
      return null;
    }
  }

  async list(): Promise<Entry[] | null> {
    const sentence =
      "SELECT entries.*, IFNULL(authors.name, 'Unknown') AS author_name FROM entries LEFT JOIN authors ON entries.author_id = authors.id;";
    try {
      const [result]: any = await query(sentence, []);
      if (result === null) {
        return null;
      }
      const response: Array<Entry> = [];
      result.map((entry: any) => {
        response.push({
          id: entry.id,
          title: entry.title,
          content: entry.content,
          author_id: entry.author_id,
          author_name: entry.author_name,
        });
      });
      return response;
    } catch (error) {
      console.log("Ha ocurrido un error durante la petición.");
      console.error(error);
      return null;
    }
  }
  async update(entry: EntryUpdate): Promise<Entry | null> {
    throw new Error("Method not implemented.");
  }
}
