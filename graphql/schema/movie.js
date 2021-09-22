export const movie = `
    """ Movie Type """
    type Movie {
        producer: String!
        title: String!
        releaseYear: Int!
        duration: Int!
        videoQuality: String!
        image: String!
        synopsis: String!
        viewerMatch: Int!
        maturityRating: Int!
        genres: [Genre!]!
        writers: [Writer!]!
        casts: [Cast!]!
        Directors: [Director!]!
    }
`;