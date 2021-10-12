export const users = `
    """ Schema for an User """
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        token: String
        created_at: String
        updated_at: String
    }
`;