import User from "../domain/User";
import UserRepository from "../domain/UserRepository";
import EncryptInterface from "./services/EncryptInterface";
import NotificationInterface from "./services/NotificationInterface";

export default class RegisterUseCase {
  constructor(
    readonly userRepository: UserRepository,
    readonly encryptInterface: EncryptInterface,
    readonly notificationInterface: NotificationInterface
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

      const feedback = this.notificationInterface.sendNotification(`¡El usuario ${name} se ha unido a la plataforma!`)
      console.log(feedback)
      return user;
    } catch (error) {
      return null;
    }
  }
}
