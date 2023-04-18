export const query = `
    """ Query """
    type Query {
        """ Query for Get Movie \n
        Option : \n
            id: ID / (id of the movie) !! if ID not provided latest movie will be fetch !!
            language: String / en-US (default) Optional \n
        """
        getMovie(id: ID, language: String): Movie

        """ Query for Get Serie \n
        Option : \n
            id: ID / (id of the movie) !! if ID not provided latest movie will be fetch !!
            language: String / en-US (default) Optional \n
            appendToResponse: String / null (default) Optional \n
                Option can be : aggregate_credits \n
                                credits \n
                                images \n
        """
        getSerie(id: ID, language: String, appendToResponse: String): Serie

        """ Query for Get Discover movies or series \n
        Option : \n
            media: String / movie (default) !! Required !! \n
                Option can be : movie \n
                                tv \n
            language: String / en-US (default) Optional \n
            sortBy: String / popularity.desc (default) Optional \n
                Option can be   popularity.asc \n
                                release_date.desc/asc \n
                                revenue.desc/asc \n
                                primary_release_date.desc/asc \n
            page: Int / 1 (default) Optional \n
            kid: Boolean / false (default) Optional \n
            originalLanguage: String / EN (default) Optional \n
        """
        getDiscover(media: String, language: String, sortBy: String, page: Int, kid: Boolean, originalLanguage: String): Discover!

        """ Query for Get Now Playing / Upcoming / Top rated / Popular / Similar / Recommendations Movies \n
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

        """ Query for Get Similar / Recommendations TV \n
        Option : \n
            whatToTarget: String / now_playing (default) !! Required !! \n
                Option can be   similar \n
                                recommendations \n
                                airing_today \n
                                on_the_air \n
                                popular \n
                                top_rated \n
            language: String / en-US (default) Optional \n
            page: String / 1 (default) Optional \n
            region: String / US (default) Optional \n
        """
        getUpcomTopRatedPopuNowPlayingTV(whatToTarget: String, language: String, page: String, id: ID): TVResult!

        """ Query for Get Credits for a Movie """
        getCredits(id: ID!, language: String): MovieCredits

        """ Query for Get Certifications for Movies and TV
        Option : \n
            media: String / movie (default) Optional \n
                Option can be   movie \n
                                tv \n
            language: String / en-US (default) Optional \n
        """
        getCertifications(media: String, language: String): Certifications!

        """ Query for Get Genres for Movies and TV
        Option : \n
            media: String / movie (default) Optional \n
                Option can be   movie \n
                                tv \n
            language: String / en-US (default) Optional \n
        """
        getGenres(media: String, language: String): Genres!

        """ Query for Get a Company
        Option : \n
            id: ID / id of a company !! Required !! \n
            language: String / en-US (default) Optional \n
        """
        getCompany(id: String, language: String): Company!

        """ Query for Get Network
            Option : \n
                id: ID / id of network !! Required !! \n
                language: String / en-US (default) Optional \n
        """
        getNetwork(id: ID!, language: String): Network!

        """ Query for Get a People
            Option : \n
                id: ID / id of people !! Required !! \n
                language: String / en-US (default) Optional \n
                append_to_response: String / null as (default) Optional \n
                    Option can be :     movie_credits \n
                                        tv_credits \n
                                        combined_credits \n
                                        images \n
        """
        getPeople(id: ID!, language: String, appendToResponse: String): People!

        """ Query for Get a Season for a TV show
        Option : \n
            tvId: ID / id of TV show !! Required !! \n
            seasonNumber: String / 1 (default) season number of TV show !! Required !! \n
            language: String / en-US (default) Optional \n
            append_to_response: String / null as (default) Optional \n
                Option can be :     aggregate_credits \n
                                    credits \n
                                    images \n
    """
    getSeason(tvId: ID!, seasonNumber: String!, language: String, appendToResponse: String): TVSeason!

    """ Query for Get a Episode of a Season for a TV show
    Option : \n
        tvId: ID / id of TV show !! Required !! \n
        seasonNumber: String / 1 (default) season number of TV show !! Required !! \n
        episodeNumber: String / 1 (default) episode number of TV show !! Required !! \n
        language: String / en-US (default) Optional \n
        append_to_response: String / null as (default) Optional \n
            Option can be :     credits \n
                                images \n
    """
    getEpisode(tvId: ID!, seasonNumber: String!, episodeNumber: String!, language: String, appendToResponse: String): TVEpisode!

    """ Query for Get a Trending for TV/Movie/Person
    Option : \n
        mediaType: String / all (default) !! Required !! \n
            Option can be :     all \n
                                movie \n
                                tv \n
                                person \n
        timeWindow: String / week (default) !! Required !! \n
            Option can be :     day \n
                                week \n
        language: String / en-US (default) Optional \n
        page: String / 1 (default) Optional \n
    """
    getTrending(mediaType: String!, timeWindow: String!, language: String, page: String): Trending!

    """ Query for Get a Collection of a Movie
    Option : \n
    collectionID: ID / id of Collection !! Required !! \n
        language: String / en-US (default) Optional \n
    """
    getCollection(collectionID: ID!, language: String): Collection!

    """ Query for Get a Result for search Company or Collection
    Option : \n
        whatToTarget: String / movie (default) !! Required !! \n
            Option can be : company \n
                            collection \n
        query: String / Query to search for !! Required !! \n
        language: String / en-US (default) Optional \n
        page: String / 1 (default) Optional \n
    """
    getSearchCompOrColl(whatToTarget: String!, query: String!, language: String, page: String): SearchCompOrColl!

    """ Query for Get a Result for search Movie, TV or Person
    Option : \n
        whatToTarget: String / movie (default) !! Required !! \n
            Option can be : movie \n
                            tv \n
                            person \n
        query: String / Query to search for !! Required !! \n
        language: String / en-US (default) Optional \n
        page: String / 1 (default) Optional \n
        includeAdult: Boolean / false (default) Optional \n
        region: String / US (default) Optional \n
        primaryReleaseYear: String / null (default) Optional \n
        year: String / null (default) Optional \n
    """
    getSearchMoviesTVOrPeople(whatToTarget: String!, query: String!, language: String, page: String, includeAdult: Boolean, region: String, primaryReleaseYear: String, year: String ): SearchMoviesTVOrPeople!

    """ Query for Get a Result for search Multi
    Option : \n
        query: String / Query to search for !! Required !! \n
        language: String / en-US (default) Optional \n
        page: String / 1 (default) Optional \n
        includeAdult: Boolean / false (default) Optional \n
        region: String / US (default) Optional \n
    """
    getSearchMulti(query: String!, language: String, page: String, includeAdult: Boolean, region: String): SearchMulti!


    """ Query for Get an User
        Option : \n
            _id: ID! / id of the user to find
    """
    getUser: User!

    """ Login user Query : \n
    Option: email / String !! Required !! \n
            password / String !! Required !!
    """
    loginUser(email: String!, password: String!): User!

    }
`;