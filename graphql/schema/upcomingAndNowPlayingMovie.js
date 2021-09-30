export const upcomingAndNowPlayingMovie = `
    """ Result for Upcoming and Now Playing Movies """
    type UpcomingAndNowPlayingMovie {
        page: Int!
        results: [MoviesDiscover!]!
        dates: Date
        total_pages: Int!
        total_results: Int!
    }

    type Date {
        maximum: String
        minimum: String
    }
`;