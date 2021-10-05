export const people = `
    """ Schema for People """
    type People {
        birthday: String
        known_for_department: String!
        deathday: String
        id: ID!
        name: String!
        also_known_as: [String!]!
        gender: Int!
        biography: String!
        popularity: Float!
        place_of_birth: String
        profile_path: String
        adult: Boolean!
        imdb_id: String!
        homepage: String
        movie_credits: MediaCredits
        tv_credits: MediaCredits
        combined_credits: MediaCredits
        images: PeopleImg
    }
`;