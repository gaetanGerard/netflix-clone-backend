export const search = `
    """ type for Search Collections """
    type SearchCollection {
        id: ID!
        backdrop_path: String
        name: String!
        poster_path: String
        adult: Boolean!
        original_language: String
        original_name: String
        overview: String!
    }

    """ Type Search Companies or Collections """
    type SearchCompOrColl {
        page: Int!
        results: [SearchCompOrCollUnion!]!
        total_results: Int!
        total_pages: Int!
    }
    """ Type Search Movies, TV or People """
    type SearchMoviesTVOrPeople {
        page: Int!
        results: [MovieTVPeopleUnion!]!
        total_results: Int!
        total_pages: Int!
    }
    """ Type Search Multi """
    type SearchMulti {
        page: Int!
        results: [TrendingUnion!]!
        total_results: Int!
        total_pages: Int!
    }
`;