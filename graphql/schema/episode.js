export const episode = `
    """ Episode Type """
    type Episode {
        id: ID!
        seasonId: String!
        showId: String!
        duration: Int!
        episodeTitle: String!
        cover: String!
        synopsis: String!
        directors: [Director]
        casts: [Cast!]!
    }
`;