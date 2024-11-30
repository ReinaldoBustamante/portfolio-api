import { hash } from 'bcrypt'
export class BcryptAdapter {

    public static async hashPassword(password: string, salt:number) {
        const passwordHashed = await hash(password, 10);
        return passwordHashed
    }
}