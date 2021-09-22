export const serie = `
    """ Serie Type """
    type Serie {
        id: ID!
        serieName: String!
        videoQuality: String!
        releaseYear: Int!
        image: String!
        synopsis: String!
        viewerMatch: Int!
        maturityRating: Int!
        numberOfSeason: Int!
        seasons: [Season!]!
        creators: [Creator!]!
        casts: [Cast!]!
        genres: [Genre!]!
        thisShowIs: String!
    }
`;