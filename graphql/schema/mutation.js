export const mutation = `
    """ Mutation """
    type Mutation {
        """ Login Mutation : \n
            Option: email / String !! Required !! \n
                    password / String !! Required !!
        """
        login(email: String!, password: String!): User!

        """ Register Mutation : \n
            Option: username / String !! Required !! \n
                    email / String !! Required !! \n
                    password / String !! Required !!
        """
        register(username: String!, email: String!, password: String!): User!
    }
`;