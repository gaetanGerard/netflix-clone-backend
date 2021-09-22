export const director = `
    """ Director Type """
    type Director implements Person {
        id: ID!
        name: String!
        movies: [Movie!]!
    }
`;