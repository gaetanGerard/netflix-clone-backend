export const genre = `
    """ Genre Type """
    type Genre {
        id: ID!
        name: String!
    }

    """ Genres Type """
    type Genres {
        genres: [Genre!]!
    }
`;