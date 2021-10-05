export const images = `
    """ Schema for a People Image """
    type PeopleImg {
        profiles: [ProfilesImg!]!
    }

    """ Schema for Profiles Image """
    type ProfilesImg {
        aspect_ratio: Float!
        file_path: String!
        height: Int!
        iso_639_1: String
        vote_average: Float!
        vote_count: Int!
        width: Int!
    }
`;