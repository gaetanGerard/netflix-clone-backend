export const cast = `
    """ Type Cast """
    type Cast {
        id: ID!
        adult: Boolean!
        gender: Int
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
`;