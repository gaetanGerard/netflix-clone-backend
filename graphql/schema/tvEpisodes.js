export const tvEpisodes = `
    """ Schema for One Episode of a Season """
    type TVEpisode {
        air_date: String
        episode_number: Int
        crew: [Crew!]
        guest_stars: [GuestStar!]
        id: ID!
        name: String
        overview: String
        production_code: String
        season_number: Int
        still_path: String
        vote_average: Float
        vote_count: Int
        credits: TVEpisodeCredits
        images: TVEpisodeImages
    }
`;