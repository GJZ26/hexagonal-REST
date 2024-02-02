import TokenInterface from "../../application/services/TokenInterface";
import User from "../../domain/User";

export default class TokenService implements TokenInterface{
    create_token(user:User): string {
        throw new Error("Method not implemented.");
    }
    validate_token(token: string): boolean {
        throw new Error("Method not implemented.");
    }
}