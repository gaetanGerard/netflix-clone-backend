export const movieResult = `
    """ Result for Discover Movies """
    type MovieResult {
        page: Int!
        results: [MoviesDiscover!]!
        total_pages: Int!
        total_results: Int!
    }
`