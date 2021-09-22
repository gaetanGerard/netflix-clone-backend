export const resolvers = {
    Query: {
        getMovies: async (_, { language, sortBy, page, primaryReleaseDateGTE }, { dataSources }) => {
            try {
              return dataSources.moviesApi.getMovies(language, sortBy, page, primaryReleaseDateGTE);
            } catch (error) {
              console.log(error)
            }
        },

        getMovie: async (_, { id, language }, { dataSources }) => {
            try {
              return dataSources.moviesApi.getMovie(id, language);
            } catch (error) {
              console.log(error)
            }
        }
    }
}