export default interface EncryptInterfaces {
  hash(password: string): string;
  compare(hashed_password: string, plain_password: string): boolean;
}
