
export class UpdateProjectDto {
    constructor(
        public title?: string,
        public description?: string,
        public repository_url?: string,
        public demo_url?: string
    ) { }

    public static create(object: { [key: string]: any }): [string?, UpdateProjectDto?] {
        const {title, description, repository_url, demo_url} = object
        
        return [undefined, new UpdateProjectDto(title, description, repository_url, demo_url)]
    }
}