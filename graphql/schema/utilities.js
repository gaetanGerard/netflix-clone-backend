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
`;