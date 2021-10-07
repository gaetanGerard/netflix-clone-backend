export const credits = `
    """ Schema for a Guest Star member for a Episode """
    type GuestStar {
        adult: Boolean!
        gender: Int
        id: ID!
        known_for_department: String!
        name: String!
        original_name: String!
        popularity: Float!
        profile_path: String
        character: String!
        credit_id: String!
        order: Int!
    }

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
        cast_id: Int
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

    """ Schema for People Cast Movie """
    type PeopleCastMovie {
        character: String!
        credit_id: String!
        release_date: String!
        vote_count: Int!
        video: Boolean!
        adult: Boolean!
        vote_average: Float!
        title: String!
        genre_ids: [Int!]!
        original_language: String!
        original_title: String!
        popularity: Float!
        id: ID!
        backdrop_path: String
        overview: String!
        poster_path: String
        media_type: String
    }

    """ Schema for People Crew Movie """
    type PeopleCrewMovie {
        id: ID!
        department: String!
        original_language: String!
        original_title: String!
        job: String!
        overview: String!
        vote_count: Int!
        video: Boolean!
        poster_path: String
        backdrop_path: String
        title: String!
        popularity: Float!
        genre_ids: [Int!]!
        vote_average: Float!
        adult: Boolean!
        release_date: String
        credit_id: String!
        media_type: String
    }

    """ Schema for People Cast TV """
    type PeopleCastTV {
        credit_id: String!
        original_name: String!
        id: ID!
        genre_ids: [Int!]!
        character: String!
        name: String!
        poster_path: String
        vote_count: Int!
        vote_average: Float!
        popularity: Float!
        episode_count: Int!
        original_language: String!
        first_air_date: String!
        backdrop_path: String
        overview: String!
        origin_country: [String!]!
        media_type: String
    }

    """ Schema for People Crew TV """
    type PeopleCrewTV {
        id: ID!
        department: String!
        original_language: String!
        episode_count: Int!
        job: String!
        overview: String!
        origin_country: [String!]!
        original_name: String!
        genre_ids: [Int!]!
        name: String!
        first_air_date: String
        backdrop_path: String
        popularity: Float!
        vote_count: Int!
        vote_average: Float!
        poster_path: String
        credit_id: String!
        media_type: String
    }


    """ Schema for return result of credits for a TV """
    type TVCredits {
        cast: [Cast!]!
        crew: [Crew!]!
    }

    """ Schema for return result of credits for a movie """
    type MediaCredits {
        id: ID
        cast: [CastUnion!]!
        crew: [CrewUnion!]!
    }

    """ Schema for Aggregate TV Cast """
    type AggregateTVCast {
        adult: Boolean!
        gender: Int
        id: ID!
        known_for_department: String!
        name: String!
        original_name: String!
        popularity: Float!
        profile_path: String
        roles: [Role!]!
        total_episode_count: Int!
        order: Int!
    }

    """ Schema for Aggregate TV Crew """
    type AggregateTVCrew {
        adult: Boolean!
        gender: Int
        id: ID!
        known_for_department: String!
        name: String!
        original_name: String!
        popularity: Float!
        profile_path: String
        jobs: [Job!]!
        department: String
        total_episode_count: Int!
    }

    """ Schema for Aggregate Credits for TV """
    type AggregateCreditsTV {
        id: ID
        cast: [AggregateTVCast!]!
        crew: [AggregateTVCrew!]!
    }
`;