export const crew = `
    """ Type Crew """
    type Crew {
        id: ID!
        adult: Boolean!
        gender: Int
        known_for_department: String!
        name: String!
        original_name: String!
        popularity: Float!
        profile_path: String
        credit_id: String!
        department: String!
        job: String!
    }
`;