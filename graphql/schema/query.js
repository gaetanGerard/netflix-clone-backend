export const query = `
    type Query {
        getMovies: [Movie!]!
        getMovie(_id: ID!): Movie
    }
`;