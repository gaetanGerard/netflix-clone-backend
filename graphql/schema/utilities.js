export const utilities = `
    """ Schema for Genres used in Movie Schema """
    type Genres {
        genres: [Genre!]!
    }

    """ Schema for a Genre used in Genres Schema """
    type Genre {
        id: ID!
        name: String!
    }

    """ Schema for a Production Company used in Movie Schema """
    type ProductionCompanies {
        name: String!
        id: ID!
        logo_path: String
        origin_country: String!
    }

    """ Schema for a Production Country used in Movie Schema """
    type ProductionCountries {
        iso_3166_1: String!
        name: String!
    }

    """ Schema for a Production Country used in Movie Schema """
    type SpokenLanguages {
        english_name: String
        iso_639_1: String!
        name: String!
    }

    """ Schema for a Collection used in Movie Schema """
    type Collection {
        id: ID!
        name: String!
        poster_path: String
        backdrop_path: String
    }

    """ Schema for a Date used in ResultWithDate Schema """
    type Date {
        maximum: String
        minimum: String
    }

    """ Schema for a Company """
    type Company {
        description: String!
        headquarters: String!
        homepage: String!
        id: ID!
        logo_path: String!
        name: String!
        origin_country: String!
        parent_company: Company
    }

    """ Schema for CreatedBy """
    type CreatedBy {
        id: ID!
        credit_id: String!
        name: String!
        gender: Int!
        profile_path: String
    }

    """ Schema for Seasons """
    type Seasons {
        air_date: String!
        episode_count: Int!
        id: ID!
        name: String!
        overview: String!
        poster_path: String
        season_number: Int!
    }

    """ Schema for Role """
    type Role {
        credit_id: String!
        character: String!
        episode_count: Int!
    }

    """ Schema for Job """
    type Job {
        credit_id: String!
        job: String!
        episode_count: Int!
    }

    """ Schema for a Message """
    type Message {
        msg: String!
        type: String!
    }
`;