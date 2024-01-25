import User from "./User";

export default interface UserRepository {
  login(email: string, password: string): Promise<User | null>;
  register(name: string, email: string, password: string): Promise<User | null>;
  get_by_pk(id: number): Promise<User | null>;
  get_by_email(email: string): Promise<User | null>
}
