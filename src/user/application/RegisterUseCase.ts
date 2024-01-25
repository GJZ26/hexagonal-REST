import User from "../domain/User";
import UserRepository from "../domain/UserRepository";

export default class RegisterUseCase {
  constructor(readonly userRepository: UserRepository) {}
  async run(
    name: string,
    email: string,
    password: string
  ): Promise<User | null> {
    try {
      const user = await this.userRepository.register(name, email, password);
      return user;
    } catch (error) {
      return null;
    }
  }
}
