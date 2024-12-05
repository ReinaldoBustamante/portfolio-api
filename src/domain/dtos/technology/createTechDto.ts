export class CreateTechDto {
    constructor(
        public name: string
    ) { }

    public static create(object: { [key: string]: any }): [string?, CreateTechDto?] {
        const { name } = object
        if (!name) return ['Missing name']

        return [undefined, new CreateTechDto(name)]
    }
}