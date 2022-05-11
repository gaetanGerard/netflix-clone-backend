export const users = `
    """ Schema for an User """
    type User {
        _id: ID!
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
        subscriptionPlan: String
        profiles: [Profile]
    }
    """ Schema for a Profile """
    type Profile {
        p_name: String!
        kid: Boolean!
        language: String!
        profile_pic: Int!
        autoplay_next_episode: Boolean!
        autoplay_preview: Boolean!
        my_list: [MovieTVList]
    }

    type MovieTVList {
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