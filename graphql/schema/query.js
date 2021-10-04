export const query = `
    """ Query """
    type Query {
        """ Get Movies List \n
        Option : \n
            id: ID / (id of the movie) !! if ID not provided latest movie will be fetch !!
            language: String / en-US (default) Optional \n
        """
        getMovie(id: ID, language: String): Movie

        """ Get Discover movies or series \n
        Option : \n
            whatToTarget: String / company (default) !! Required !! \n
            media: String / movie (default) !! Required !! \n
                Option can be : movie \n
                                tv \n
            language: String / en-US (default) Optional \n
            sortBy: String / popularity.desc (default) Optional \n
                Option can be   popularity.asc \n
                                release_date.desc/asc \n
                                revenue.desc/asc \n
                                primary_release_date.desc/asc \n
            primaryReleaseDateGTE: String / 2018 (default) Optional \n
        """
        getDiscover(whatToTarget: String, media: String, language: String, sortBy: String, primaryReleaseDateGTE: String): Discover!

        """ Get Now Playing / Upcoming / Top rated / Popular movies \n
        Option : \n
            whatToTarget: String / now_playing (default) !! Required !! \n
                Option can be   upcoming \n
                                top_rated \n
                                popular \n
            language: String / en-US (default) Optional \n
            page: String / 1 (default) Optional \n
            region: String / US (default) Optional \n
        """
        getUpcomTopRatedPopuNowPlaying(whatToTarget: String, language: String, page: String, region: String, id: ID): ResultUnion!

        """ Get Credits for a Movie """
        getCredits(id: ID!, language: String): MediaCredits

        getCertifications(media: String): Certifications!

    }
`;