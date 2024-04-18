import query from "../../database/connection";
import UUIDInterface from "../application/services/UUIDInterface";
import EntryRequest from "../domain/DTOS/EntryRequest";
import EntryUpdate from "../domain/DTOS/EntryUpdate";
import Entry from "../domain/Entry";
import EntryRepository from "../domain/EntryRepository";

export default class MySqlEntryRepository implements EntryRepository {
  constructor() {}

  async create(entry: EntryRequest): Promise<Entry | null> {
    const sentence =
      "INSERT INTO entries(id, author_id, title, content) VALUES(?,?,?,?)";
    const params: string[] = [
      entry.id!,
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
      "SELECT entries.*, IFNULL(authors.name, 'Unknownn') AS author_name FROM entries LEFT JOIN authors ON entries.author_id = authors.id;";
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

  async getByPk(pk: string): Promise<Entry | null> {
    const sentence = "SELECT * FROM entries WHERE id = ?";
    const params = [pk];
    try {
      const [entry]: any = await query(sentence, params);

      if (entry === null || entry.length === 0) {
        return null;
      }

      return entry[0];
    } catch (error) {
      console.log("Ha ocurrido un erro en tu petición.");
      console.error(error);
      return null;
    }
  }

  async update(entry: EntryUpdate): Promise<Entry | null> {
    const entryToModify = await this.getByPk(entry.id);
    if (!entryToModify) {
      console.log("No se ha encontrado la entrada solicitada");
      return null;
    }

    const sentence = "UPDATE entries SET title = ?, content = ? WHERE id = ?";
    const params: string[] = [
      entry.title ?? entryToModify.title,
      entry.content ?? entryToModify.content,
      entry.id,
    ];

    const second_sentence =
      "SELECT IFNULL(authors.name, 'Unknown') AS author_name FROM entries LEFT JOIN authors ON entries.author_id = authors.id WHERE entries.id = ?;";
    const second_params = [entry.id];

    try {
      const [result]: any = await query(sentence, params);
      const [second_result]: any = await query(second_sentence, second_params);

      if (result === null) {
        return null;
      }

      const reponse: Entry = {
        title: params[0],
        content: params[1],
        id: params[2],
        author_id: "",
        author_name: second_result[0].author_name ?? "Unknown",
      };

      console.log("Entrada actualizada.");
      return reponse;
    } catch (error) {
      console.log("Ha ocurrido un error trantando de actualizar los datos.");
      console.error(error);
      return null;
    }
  }
}
