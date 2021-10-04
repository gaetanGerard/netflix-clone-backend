export const query = `
    """ Query """
    type Query {
        """ Query for Get Movies List \n
        Option : \n
            id: ID / (id of the movie) !! if ID not provided latest movie will be fetch !!
            language: String / en-US (default) Optional \n
        """
        getMovie(id: ID, language: String): Movie

        """ Query for Get Discover movies or series \n
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

        """ Query for Get Now Playing / Upcoming / Top rated / Popular movies \n
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

        """ Query for Get Credits for a Movie """
        getCredits(id: ID!, language: String): MediaCredits

        """ Query for Get Certifications for Movies and TV
        Option : \n
            media: String / movie (default) Optional \n
                Option can be   movie \n
                                tv \n
        """
        getCertifications(media: String): Certifications!

        """ Query for Get Genres for Movies and TV
        Option : \n
            media: String / movie (default) Optional \n
                Option can be   movie \n
                                tv \n
        """
        getGenres(media: String): Genres!

    }
`;