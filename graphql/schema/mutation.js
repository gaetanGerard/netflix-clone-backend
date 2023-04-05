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

        """ Update user profile Mutation : \n
            Option: ProfileInput / Object !! Optional option !! \n
        """
        updateUserProfileList(profileList: ProfileInput!): Profile!

        """ Remove user profile Mutation : \n
            Option: p_name / String !! Required !! \n
        """
        removeProfile(p_name: String!): Message!

        """ Add movie/tv to user profile Mutation : \n
            Option: p_name / String !! Required !! \n
                    movieTVList / Object !! Required !! \n
        """
        addMovieTVToProfile(p_name: String!, movieTVList: MovieTVListInput!): MovieTVList!

        """ Remove movie/tv from user profile Mutation : \n
            Option: p_name / String !! Required !! \n
                    movieTVList / Object !! Required !! \n
        """
        removeMovieTVFromProfile(p_name: String!, movieTVList: MovieTVListInput!): Message!
    }
`;