export const query = `
    type Query {
        """ Get Movies List \n
            Option : \n
                language: String / en-En (default) Optional \n
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
            language: String / en-En (default) Optional \n
        """
        getMovie(id: ID!, language: String): Movie
    }
`;