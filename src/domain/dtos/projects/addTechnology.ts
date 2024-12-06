
export class AddTechnologyDto {
    constructor(
        public id: number
    ) { }

    public static create(object: { [key: string]: any }): [string?, AddTechnologyDto?] {
        const { id } = object
        if(!id) return ['Missing id (technology)']
        return [undefined, new AddTechnologyDto(id)]
    }
}