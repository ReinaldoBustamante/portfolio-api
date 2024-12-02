
export class UpdateExperienceDto {
    constructor(
        public company_name?: string,
        public occupation?: string,
        public init_date?: string,
        public end_date?: string,
        public description?: string,
    ) { }

    public static create(object: { [key: string]: any }): [string?, UpdateExperienceDto?] {
        const { company_name, occupation, init_date, end_date, description } = object
        const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:Z|([+-]\d{2}:\d{2}))$/;
        if (init_date && !iso8601Regex.test(init_date)) return ['init_date: invalid init date format (ISO 8601 REQUIRED)'];
        if (end_date && !iso8601Regex.test(end_date)) return ['end_date: invalid init date format (ISO 8601 REQUIRED)'];

        return [undefined, new UpdateExperienceDto(company_name, occupation, init_date, end_date, description)]
    }
}