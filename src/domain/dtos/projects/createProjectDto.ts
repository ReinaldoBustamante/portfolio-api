
export class CreateProjectDto {
    constructor(
        public title: string,
        public description: string,
        public repository_url: string,
        public demo_url: string,
        public img_url: string
    ) { }

    public static create(object: { [key: string]: any }): [string?, CreateProjectDto?] {
        const { title, description, repository_url, demo_url, img_url } = object
        if (!title) return ['Missing title']
        if(!description) return ['Missing description']
        if(!repository_url) return ['Missing repository_url']
        if(!demo_url) return ['Missing demo_url']
        if(!img_url) return ['Missing img_url']

        return [undefined, new CreateProjectDto(title, description, repository_url, demo_url, img_url)]
    }
}