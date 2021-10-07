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

    """ Schema for Backdrop and Poster """
    type BackdropAndPoster {
        aspect_ratio: Float!
        file_path: String!
        height: Int!
        iso_369_1: String
        vote_average: Float!
        vote_count: Int!
        width: Int!
    }

    """ Schema for TV or Movie Images """
    type MediaImages {
        id: ID
        backdrops: [BackdropAndPoster!]!
        posters: [BackdropAndPoster!]!
    }

    """ Schema for TV Season Images """
    type TVImages {
        posters: [BackdropAndPoster!]!
    }
`;