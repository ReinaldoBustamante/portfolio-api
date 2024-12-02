export class CreateExperienceDto {

    constructor(
        public company_name: string,
        public occupation: string,
        public init_date: Date,
        public end_date: Date,
        public description: string,
    ){}

    public static create(object:{[key:string]: any}): [string?, CreateExperienceDto?]{
        const {company_name, occupation, init_date, end_date, description} = object
        if(!company_name) return ['Missing company_name']
        if(!occupation) return ['Missing ocuppation']
        if(!init_date) return ['Missing init_date']
        if(!end_date) return ['Missing end_date']
        if(!description) return ['Missing description']


        const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|([+-]\d{2}:\d{2}))$/;
        if (!iso8601Regex.test(init_date)) return ['init_date: invalid init date format (ISO 8601 REQUIRED)'];
        if (!iso8601Regex.test(end_date)) return ['end_date: invalid init date format (ISO 8601 REQUIRED)'];

        return[undefined, new CreateExperienceDto(company_name, occupation, init_date, end_date, description)]
    }
}