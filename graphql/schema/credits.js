export const credits = `
    """ Schema for a Cast member for a movie """
    type Cast {
        adult: Boolean!
        gender: Int
        id: ID!
        known_for_department: String!
        name: String!
        original_name: String!
        popularity: Float!
        profile_path: String
        cast_id: Int!
        character: String!
        credit_id: String!
        order: Int!
    }

    """ Schema for a Crew member for a movie """
    type Crew {
        adult: Boolean!
        gender: Int
        id: ID!
        known_for_department: String!
        name: String!
        original_name: String!
        popularity: Float!
        profile_path: String
        credit_id: String!
        department: String!
        job: String!
    }

    """ Schema for return result of credits for a movie """
    type MediaCredits {
        id: ID!
        cast: [Cast!]!
        crew: [Crew!]!
    }
`;