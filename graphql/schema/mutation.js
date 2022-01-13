export const mutation = `
    """ Mutation """
    type Mutation {
        """ Register user Mutation : \n
            Option: email / String !! Required !! \n
                    password / String !! Required !!
                    subscriptionPlan / String !! Required !!
                    specialOffers / Boolean !! Required !!
        """
        registerUser(email: String!, password: String!, subscriptionPlan: String!, specialOffers: Boolean): User!

        """ Update user Mutation : \n
            Option: UserInput / Object !! Optional option !! \n
        """
        updateUser(userDetail: UserInput!): User!

        """ Remove user Mutation : \n """
        removeUser: Message!
    }
`;