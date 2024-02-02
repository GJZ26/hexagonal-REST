import query from "../../database/connection";
import User from "../domain/User";
import UserRepository from "../domain/UserRepository";

export default class MySqlUserRepository implements UserRepository {
  async get_by_email(email: string): Promise<User | null> {
    const sql = "SELECT * FROM user WHERE email = ?";
    const params: any[] = [email];

    try {
      const [result]: any = await query(sql, params);

      if (!result || result.length === 0) {
        return null;
      }

      const userData = result[0];
      return new User(
        userData.id,
        userData.email,
        userData.password,
        userData.name
      );
    } catch (error) {
      return null;
    }
  }
  async login(email: string, password: string): Promise<User | null> {
    const sql = "SELECT * FROM user WHERE email = ? AND password = ?";
    const params: any[] = [email, password];

    try {
      const [result]: any = await query(sql, params);

      if (!result || result.length === 0) {
        return null;
      }

      const userData = result[0];
      return new User(
        userData.id,
        userData.name,
        userData.email,
        userData.password
      );
    } catch (error) {
      return null;
    }
  }

  async register(
    name: string,
    email: string,
    password: string
  ): Promise<User | null> {
    
    // Verificar si ya existe un usuario con el mismo correo electrónico
    const existingUser = await this.get_by_email(email);
    if (existingUser) {
      return null; // Usuario duplicado, no se permite el registro
    }

    const sql = "INSERT INTO user (name, email, password) VALUES (?, ?, ?)";
    const params: any[] = [name, email, password];

    try {
      const [result]: any = await query(sql, params);

      return new User(result.insertId, name, email, password);
    } catch (error) {
      return null;
    }
  }

  async get_by_pk(id: number): Promise<User | null> {
    const sql = "SELECT * FROM user WHERE id = ?";
    const params: any[] = [id];

    try {
      const [result]: any = await query(sql, params);

      if (!result || result.length === 0) {
        return null;
      }

      const userData = result[0];
      return new User(
        userData.id,
        userData.name,
        userData.email,
        userData.password
      );
    } catch (error) {
      return null;
    }
  }
}
