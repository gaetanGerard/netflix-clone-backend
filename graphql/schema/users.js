export const users = `
    """ Schema for an User """
    type User {
        _id: ID!
        username: String!
        email: String!
        password: String!
        token: String
        firstname: String
        lastname: String
        date_of_birth: String
        gender: Int
        profile_pic: String
        description: String
        created_at: String
        updated_at: String
        rememberMe: Boolean
        specialOffers: Boolean
    }
`;