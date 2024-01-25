import User from "../domain/User";
import UserRepository from "../domain/UserRepository";

export default class GetByEmailUseCase {
  constructor(readonly userRepository: UserRepository) {}

  async run(email: string): Promise<User | null> {
    try {
      const result = await this.userRepository.get_by_email(email);
      return result;
    } catch {
      return null;
    }
  }
}
