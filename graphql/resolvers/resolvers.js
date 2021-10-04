export const resolvers = {
    Query: {
        getMovies: async (_, { language, sortBy, page, primaryReleaseDateGTE }, { dataSources }) => {
            try {
              return dataSources.moviesApi.getMovies(language, sortBy, page, primaryReleaseDateGTE);
            } catch (error) {
              console.log(error);
            }
        },

        getMovie: async (_, { id, language }, { dataSources }) => {
            try {
              return dataSources.moviesApi.getMovie(id, language);
            } catch (error) {
              console.log(error);
            }
        },

        getSimilarOrRecommendationsMovie: async (_, { id, whatToTarget, language, page }, { dataSources }) => {
          try {
            return dataSources.moviesApi.getSimilarOrRecommendationsMovie(id, whatToTarget, language, page);
          } catch (error) {
            console.log(error);
          }
        },

        getLatestMovie: async (_, { language }, { dataSources }) => {
          try {
            return dataSources.moviesApi.getLatestMovie(language);
          } catch (error) {
            console.log(error);
          }
        },

        getNowPlayingOrUpcomingMovies: async (_, { whatToTarget, language, page, region }, { dataSources }) => {
          try {
            return dataSources.moviesApi.getNowPlayingPopularTopRatedUpcomingMovie(whatToTarget, language, page, region);
          } catch (error) {
            console.log(error);
          }
        },

        getPopularOrTopRatedMovies: async (_, { whatToTarget, language, page, region }, { dataSources }) => {
          try {
            return dataSources.moviesApi.getNowPlayingPopularTopRatedUpcomingMovie(whatToTarget, language, page, region);
          } catch (error) {
            console.log(error);
          }
        },

        getMovieCredits: async (_, { id, language }, { dataSources }) => {
          try {
            return dataSources.moviesApi.getMovieCredits(id, language);
          } catch (error) {
            console.log(error);
          }
        },

        getGenres: async (_, { media, language }, { dataSources }) => {
          try {
            return dataSources.moviesApi.getGenres(media, language);
          } catch (error) {
            console.log(error);
          }
        },

        getMovieCertification: async (_, {}, { dataSources }) => {
          try {
            return dataSources.moviesApi.getCertifications("movie");
          } catch (error) {
            console.log(error);
          }
        },

        getTVCertification: async (_, {}, { dataSources }) => {
          try {
            return dataSources.moviesApi.getCertifications("tv");
          } catch (error) {
            console.log(error);
          }
        },

        getCompanies: async (_, { whatToTarget, companyId }, { dataSources }) => {
          try {
            return dataSources.moviesApi.getCompaniesOrNetwork(whatToTarget, companyId);
          } catch (error) {
            console.log(error);
          }
        },

        getNetworks: async (_, { whatToTarget, companyId }, { dataSources }) => {
          try {
            return dataSources.moviesApi.getCompaniesOrNetwork(whatToTarget, companyId);
          } catch (error) {
            console.log(error);
          }
        },

    }
}