export const cast = `
    """ Cast Type """
    type Cast implements Person {
        id: ID!
        name: String!
        movies: [Movie!]!
    }
`;