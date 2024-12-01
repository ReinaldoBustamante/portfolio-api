import { hash, compare } from 'bcrypt'
export class BcryptAdapter {

    public static async hashPassword(password: string, salt:number) {
        const passwordHashed = await hash(password, 10);
        return passwordHashed
    }

    public static async comparePassword(password: string, hash: string){
        const isValid = await compare(password, hash)
        return isValid
    }
}