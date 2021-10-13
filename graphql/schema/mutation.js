export const mutation = `
    """ Mutation """
    type Mutation {
        """ Login user Mutation : \n
            Option: email / String !! Required !! \n
                    password / String !! Required !!
        """
        loginUser(email: String!, password: String!): User!

        """ Register user Mutation : \n
            Option: username / String !! Required !! \n
                    email / String !! Required !! \n
                    password / String !! Required !!
        """
        registerUser(username: String!, email: String!, password: String!): User!

        """ Update user Mutation : \n
            Option: UserInput / Object !! Optional option !! \n
        """
        updateUser(userDetail: UserInput!): User!
    }
`;