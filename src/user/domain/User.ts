export default class User{
    constructor(
        readonly id: number,
        readonly email: string,
        readonly password:string,
        readonly name: string
    ){
    }
}