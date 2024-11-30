
import { BcryptAdapter } from "../../config/adapters/bcrypt.adapter";
import { prisma } from "../../config/db/connection";
import { RegisterUserDto } from "../dtos/auth/registerDto";
import { CustomError } from "../errors/customError";

export class AuthService {

    public async registerUser(registerUserDto: RegisterUserDto) {

        const isUserExist = await prisma.user.findUnique({
            where: {
                email: registerUserDto.email
            }
        }) !== null
        if (isUserExist) throw CustomError.conflict('Usuario ya existe')

        const hashedPassword = await BcryptAdapter.hashPassword(registerUserDto!.password, 10)
        const { password, ...user } = await prisma.user.create({
            data: {
                ...registerUserDto!,
                password: hashedPassword
            }
        })

        return user
    }
}