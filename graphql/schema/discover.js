export const discover = `
    """ Schema for Movies Discover """
    type MoviesDiscover {
        id: ID!
        adult: Boolean
        backdrop_path: String
        genre_ids: [Int]
        original_language: String!
        original_title: String!
        overview: String!
        popularity: Float
        poster_path: String
        release_date: String!
        title: String!
        video: Boolean!
        vote_average: Float!
        vote_count: Int!
        media_type: String
    }

    """ Schema for TV Discover """
    type TVDiscover {
        id: ID!
        poster_path: String
        popularity: Float
        backdrop_path: String
        vote_average: Float!
        overview: String!
        first_air_date: String
        origin_country: [String!]!
        genre_ids: [Int]
        original_language: String!
        vote_count: Int!
        name: String!
        original_name: String!
        media_type: String
    }

    """ Schema of the object result of Discover works for movies and series """
    type Discover {
        page: Int!
        results: [DiscoverResultUnion!]!
        total_pages: Int!
        total_results: Int!
    }

    """ Schema for TV Result """
    type TVResult {
        page: Int!
        results: [TVDiscover!]!
        total_pages: Int!
        total_results: Int!
    }

    """ Schema of the object return for the result of similar or recommendations movies """
    type ResultWithDate {
        page: Int!
        results: [DiscoverResultUnion!]!
        dates: Date
        total_pages: Int!
        total_results: Int!
    }
`;