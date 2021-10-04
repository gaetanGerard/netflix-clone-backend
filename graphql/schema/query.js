export const query = `
    type Query {
        """ Get Movies List \n
            Option : \n
                language: String / en-US (default) Optional \n
                sortBy: String / popularity.desc (default) Optional \n
                    option can be popularity.asc \n
                                  release_date.asc/desc \n
                                  revenue.asc/desc \n
                                  primary_release_date.asc/desc \n
                                  original_title.asc/desc \n
                                  vote_average.asc/desc \n
                                  vote_count.asc/desc \n
                page: String / "1" (default) Optional \n
                primaryReleaseDateGTE: String / 2018 (default) Optional \n
        """
        getMovies(language: String, sortBy: String, page: String, primaryReleaseDateGTE: String): MovieResult!

        """ Get Movies List \n
        Option : \n
            id: ID / (id of the movie) !! Required !!
            language: String / en-US (default) Optional \n
        """
        getMovie(id: ID!, language: String): Movie

        """ Get Similar or Recommendations Movies \n
        Option : \n
            id: ID / (id of the movie) !! Required !! \n
            language: String / en-US (default) Optional \n
            page: String / 1 (default) Optional \n
            whatToTarget: String / similar (default) !! Required !!
                option can be : recommendations \n
                                similar \n
        """
        getSimilarOrRecommendationsMovie(id: ID!, whatToTarget: String!, language: String, page: String): MovieResult!

        """ Get Latest Movie \n
            Option : \n
                language: String / en-US (default) Optional
        """
        getLatestMovie(language: String): Movie!

        """ Get Now Playing Movies or Upcoming Movies \n
            Option : \n
                language: String / en-US (default) Optional \n
                page: String / 1 (default) Optional \n
                region: String / can be Initial of a country in upercase (US, BE, FR, ...) Optional \n
                whatToTarget: String / now_playing (default) !! Required !!
                    option can be : upcoming \n
                                    now_playing \n
        """
        getNowPlayingOrUpcomingMovies(whatToTarget: String!, language: String, page: String, region: String): UpcomingAndNowPlayingMovie!

        """ Get Popular or Top Rated Movies \n
        Option : \n
            language: String / en-US (default) Optional \n
            page: String / 1 (default) Optional \n
            region: String / can be Initial of a country in upercase (US, BE, FR, ...) Optional \n
            whatToTarget: String / popular (default) !! Required !!
                option can be : popular \n
                                top_rated \n
        """
        getPopularOrTopRatedMovies(whatToTarget: String!, language: String, page: String, region: String): MovieResult!

        """ Get Movie Credits \n
            Option : \n
                id: ID! / (movie id) !! Required !! \n
                language: String / en-Us (default) Optional
        """
        getMovieCredits(id: ID!, language: String): MovieCredits!

        """ Get Genres \n
            Option : \n
                media: String / movie (default) !! Required !! \n
                    Option can be : movie \n
                                    tv \n
                language: String / en-US (default) Optional
        """
        getGenres(media: String!, language: String): Genres!

        """ Get Movie Certifications """
        getMovieCertification: MovieCert!

        """ Get TV Certifications """
        getTVCertification: TVCert!

        """ Get Company
            Option : \n
                id: ID / companyId !! Required !!
        """
        getCompanies(companyId: ID!): Company!

    }
`;