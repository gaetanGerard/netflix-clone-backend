export const writer = `
    """ Writer Type """
    type Writer implements Person {
        id: ID!
        name: String!
        movies: [Movie!]!
    }
`;