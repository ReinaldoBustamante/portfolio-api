
export class LoginDto {
    constructor(
        public email: string,
        public password: string
    ) { }

    public static create(object: { [key: string]: any }): [string?, LoginDto?] {
        const {email, password} = object
        if(!email) return ['Missing email']
        if(!password) return ['Missing password']


        return [undefined, new LoginDto(email, password)]
    }
}