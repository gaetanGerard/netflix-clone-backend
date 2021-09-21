export const query = `
    type Query {
        getAuthors: [Author!]!
        getAuthor(_id: ID!): Author
    }
`;