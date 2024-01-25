import User from "../domain/User";
import UserRepository from "../domain/UserRepository";

export default class GetByPkUseCase {
  constructor(readonly userRepository: UserRepository) {}

  async run(id: number): Promise<User | null> {
    try {
      const result = await this.userRepository.get_by_pk(id);
      return result;
    } catch {
      return null;
    }
  }
}
