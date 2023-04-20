export const tvSeasons = `
    """ Schema for a TV Season """
    type TVSeason {
        _id: ID!
        air_date: String
        episodes: [TVEpisode]
        name: String
        overview: String
        id: ID!
        poster_path: String
        season_number: Int
        aggregate_credits: AggregateCreditsTV
        credits: TVCredits
        images: TVImages
    }
`;