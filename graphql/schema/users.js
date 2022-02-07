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
        profile_pic: String!
        autoplay_next_episode: Boolean!
        autoplay_preview: Boolean!
    }
`;