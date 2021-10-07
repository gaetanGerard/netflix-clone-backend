export const trending = `
    """ Schema for result of Trending """
    type Trending {
        page: Int!
        results: [TrendingUnion!]!
        total_pages: Int!
        total_results: Int!
    }
`;