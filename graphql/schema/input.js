export const input = `
    """ User Input for update profile """
    input UserInput {
        firstname: String
        lastname: String
        date_of_birth: String
        gender: Int
        profile_pic: String
        description: String
        email: String
        profiles: [ProfileInput]
        password: String
        rememberMe: Boolean
        specialOffers: Boolean
        subscriptionPlan: String
    }

    input ProfileInput {
        p_name: String
        kid: Boolean
        language: String
        profile_pic: Int
        autoplay_next_episode: Boolean
        autoplay_preview: Boolean
        my_list: [MovieTVListInput]
    }

    input MovieTVListInput {
        id: ID
        title: String
        name: String
        media_type: String
        poster_path: String
        backdrop_path: String
        overview: String
        genre_ids: [Int]
        vote_average: Float
    }
`;