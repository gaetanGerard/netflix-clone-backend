export const movie = `
    """ Schema of a Movie object """
    type Movie {
        id: ID!
        adult: Boolean
        backdrop_path: String
        belongs_to_collection: Collection
        budget: Int!
        genres: [Genre!]!
        homepage: String
        imdb_id: String
        original_language: String!
        original_title: String!
        overview: String
        popularity: Float!
        poster_path: String
        production_companies: [ProductionCompanies!]!
        production_countries: [ProductionCountries!]!
        release_date: String!
        revenue: Int!
        runtime: Int
        spoken_languages: [SpokenLanguages!]!
        status: String!
        tagline: String
        title: String!
        video: Boolean!
        vote_average: Float!
        vote_count: Int!
    }
`;