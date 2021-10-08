export const collection = `
    """ Schema for Collection """
    type Collection {
        id: ID!
        name: String!
        overview: String!
        poster_path: String
        backdrop_path: String
        parts: [MoviesDiscover!]!
    }
`;