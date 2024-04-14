import UUIDInterface from "../../application/services/UUIDInterface";
import { v4 as uuidv4 } from 'uuid';

export class UUIDService implements UUIDInterface {
  get_uuid(): string {
    return uuidv4();
  }
}
