export class CustomError extends Error {
    constructor(
        public msg: string,
        public statusCode: number
    ){
        super()
    }

    public static badRequest(message: string){
        return new CustomError(message, 400)
    }

    public static conflict(message: string){
        return new CustomError(message, 409)
    }
}