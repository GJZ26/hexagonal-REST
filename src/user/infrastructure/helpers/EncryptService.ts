import bcrypt from "bcrypt";
import dotenv from "dotenv";
import EncryptInterface from "../../application/services/EncryptInterface";

dotenv.config();

export default class EncryptService implements EncryptInterface {
  
  encrypt(text: string): string {
    const salt_rounds = 4;
    return bcrypt.hashSync(text, salt_rounds);
  }

  validate(hashed_text: string | undefined, unhashed_text: string): boolean {
    if (hashed_text == undefined) {
      return false;
    }

    return bcrypt.compareSync(unhashed_text, hashed_text);
  }
}
