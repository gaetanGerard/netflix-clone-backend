export const moviesDiscover = `
    """ Type for Movies Discover """
    type MoviesDiscover {
        id: ID!
        adult: Boolean
        backdrop_path: String
        genre_ids: [Int]
        original_language: String!
        original_title: String!
        overview: String!
        popularity: Float!
        poster_path: String
        release_date: String!
        title: String!
        video: Boolean!
        vote_average: Float!
        vote_count: Int!
    }
`;