import User from "../../domain/User";

export default interface TokenInterface{
    create_token(user: User):string;
    validate_token(token:string): boolean;
}