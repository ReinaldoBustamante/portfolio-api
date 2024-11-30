export class RegisterUserDto {
    constructor(
        public readonly email: string,
        public readonly password: string,
    ) { }

    public static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
        const { email, password } = object
        if (!email) return ['Missing Email']
        if (!password) return ['Missing Password']

        return [undefined, new RegisterUserDto(email, password)]
    }
}