
import { BcryptAdapter } from "../../config/adapters/bcrypt.adapter";
import { JwtAdapter } from "../../config/adapters/jwt.adapter";
import { prisma } from "../../config/db/connection";
import { LoginDto } from "../dtos/auth/loginDto";
import { RegisterUserDto } from "../dtos/auth/registerDto";
import { CustomError } from "../errors/customError";

export class AuthService {

    private async getUserByEmail(email: string) {
        const user = await prisma.user.findUnique({ where: { email } });
        return user;
    }

    public async registerUser(registerUserDto: RegisterUserDto) {

        const user = await this.getUserByEmail(registerUserDto.email)
        if (user) throw CustomError.conflict('Usuario ya existe')

        const hashedPassword = await BcryptAdapter.hashPassword(registerUserDto!.password, 10)
        const { password, ...userEntity } = await prisma.user.create({
            data: {
                ...registerUserDto!,
                password: hashedPassword
            }
        })

        return userEntity
    }

    public async loginUser(loginDto: LoginDto) {
        const user = await this.getUserByEmail(loginDto.email)
        if (!user) throw CustomError.notFound('Usuario no existe')

        const { password, ...userEntity } = user
        const isLoginValid = await BcryptAdapter.comparePassword(loginDto.password, password)
        if (!isLoginValid) throw CustomError.unauthorized('Contraseña invalida')
        try {
            const token = await JwtAdapter.sign({
                id: userEntity.id,
                email: userEntity.email
            })
            return {
                ...userEntity,
                token
            }
            
        } catch (error) {
            console.log('Error al generar el jwt')
            throw CustomError.internal('Internal Server Error')
        }

    }
}