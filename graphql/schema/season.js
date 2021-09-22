export const season = `
    """ Season Type """
    type Season {
        id: ID!
        releaseYear: String!
        episodes: [Episode!]!
        image: String!
    }
`;