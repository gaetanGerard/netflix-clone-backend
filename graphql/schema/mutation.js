export const mutation = `
    """ Mutation """
    type Mutation {
        login(email: String!, password: String!): User!
    }
`;