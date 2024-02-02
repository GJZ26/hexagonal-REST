import User from "../domain/User";
import UserRepository from "../domain/UserRepository";
import EncryptInterface from "./services/EncryptInterface";

export default class RegisterUseCase {
  constructor(
    readonly userRepository: UserRepository,
    readonly encryptInterface: EncryptInterface
  ) {}
  async run(
    name: string,
    email: string,
    password: string
  ): Promise<User | null> {
    let encrypted_password = this.encryptInterface.encrypt(password);
    try {
      const user = await this.userRepository.register(
        name,
        email,
        encrypted_password
      );
      return user;
    } catch (error) {
      return null;
    }
  }
}
