export const movieCredits = `
    """ Type MovieCredits """
    type MovieCredits  {
        id: ID!
        cast: [Cast!]!
        crew: [Crew!]!
    }
`;