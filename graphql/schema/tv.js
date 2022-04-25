export const tv = `
    """ Schema for Serie """
    type Serie {
        backdrop_path: String
        created_by: [CreatedBy!]!
        episode_run_time: [Int!]!
        first_air_date: String!
        genres: [Genre!]!
        homepage: String!
        id: ID!
        in_production: Boolean!
        languages: [String!]!
        name: String!
        next_episode_to_air: String
        networks: [Network!]!
        number_of_episodes: Int!
        number_of_seasons: Int!
        origin_country: [String!]!
        original_language: String!
        original_name: String!
        overview: String!
        popularity: Float!
        poster_path: String
        production_companies: [ProductionCompanies!]!
        production_countries: [ProductionCountries!]!
        seasons: [Seasons!]!
        spoken_languages: [SpokenLanguages!]!
        status: String!
        tagline: String!
        type: String!
        vote_average: Float!
        vote_count: Int!
        aggregate_credits: AggregateCreditsTV
        credits: TVCredits
        images: MediaImages
    }

    type TVList {
        id: ID!
        name: String!
        media_type: String!
        poster_path: String
        backdrop_path: String
        overview: String
        genre_ids: [Int]
        vote_average: Float
    }
`;