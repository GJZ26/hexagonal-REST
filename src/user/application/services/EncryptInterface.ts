export default interface EncryptInterface {
  encrypt(text: string): string;
  validate(hashed_text: string | undefined, unhashed_text: string): boolean;
}
