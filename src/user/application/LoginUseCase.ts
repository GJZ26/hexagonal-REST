import User from "../domain/User";
import UserRepository from "../domain/UserRepository";
import EncryptInterface from "./services/EncryptInterface";

export default class LoginUseCase{
    constructor(
        readonly userRepository:UserRepository,
        readonly encryptInterface: EncryptInterface
    ){
    }
    async run(
        email: string,
        password: string
    ): Promise<User | null>{
        try{
            const result = await this.userRepository.get_by_email(email)

            if(this.encryptInterface.validate(result?.password, password)){
                
                return result
            }

            return null
        }catch (error){
            return null
        }
    }
}