export const resolvers = {

    // resolver for DisoverResult
    // thats return an object on this shape {page: Int, results: Object(what to resolve), total_page: Int, total_result: Int}
    DiscoverResultUnion: {
      __resolveType(obj) {
        if (obj.title) {
          return 'MoviesDiscover'
        }
        if (obj.name) {
          return 'TVDiscover'
        }
        return null
      }
    },

    // resolver for ResultUnion
    // thats return an object on this shape for upcoming and now_playing result have an
    // object date that top_rated/popular/similar/recommendations movies do not have
    ResultUnion: {
      __resolveType(obj) {
        if(obj.dates) {
          return 'ResultWithDate'
        }
        if(!obj.dates) {
          return 'Discover'
        }
      }
    },

    // resolver for CertificationsUnion
    // if match return TV certifications otherwise Movie certifications
    CertificationsUnion: {
      __resolveType(obj) {
        if(obj.KR) {
          return 'TVCertifications'
        } else {
          return 'MovieCertifications'
        }
      }
    },

    // resolver for CastUnion
    CastUnion: {
      __resolveType(obj) {
        if(obj.title || obj.media_type === "movie") {
          return 'PeopleCastMovie'
        }
        if (obj.name || obj.media_type === "tv") {
          return 'PeopleCastTV'
        }
        if(obj.media_type) {
          return 'CombinedCast'
        }
        return 'Cast'
      }
    },

    // resolver for CrewUnion
    CrewUnion: {
      __resolveType(obj) {
        if(obj.title || obj.media_type === "movie") {
          return 'PeopleCrewMovie'
        }
        if (obj.name || obj.media_type === "tv") {
          return 'PeopleCrewTV'
        }
        return 'Crew'
      }
    },

    Query: {
        /**
         *  Resolver to Fetch one movie if id is provided otherwise latest movie added is fetch
         * @param {_} parent
         * @param {id} arguments of the movie if not provided latest movie added will be fetch -> Optional
         * @param {language} arguments (en-US) -> Optional (en-US as default) language on this format
         * @param {dataSources} fetch data from moviesAPI
         * @returns if ID is provided a movie if no ID provided so the latest movie added to TMDB is return
         */
        getMovie: async (_, { id, language }, { dataSources }) => {
            const whatToTarget = "movie";
            try {
              return dataSources.moviesApi.getMovieOrTV(whatToTarget, id, language);
            } catch (error) {
              console.log(error);
            }
        },

        /**
         *  Resolver to Fetch one Serie if id is provided otherwise latest Serie added is fetch
         * @param {_} parent
         * @param {id} arguments of the movie if not provided latest movie added will be fetch -> Optional
         * @param {language} arguments (en-US) -> Optional (en-US as default) language on this format
         * @param {appendToResponse} arguments (null) -> Optional can append aggregate_credits,credits or images to the object
         * @param {dataSources} fetch data from moviesAPI
         * @returns if ID is provided a movie if no ID provided so the latest movie added to TMDB is return
         */
        getSerie: async (_, { id, language, appendToResponse }, { dataSources }) => {
          const whatToTarget = "tv";
          try {
            return dataSources.moviesApi.getMovieOrTV(whatToTarget, id, language, appendToResponse);
          } catch (error) {
            console.log(error);
          }
        },

        /**
         *  Resolver to Fetch a Discover list of movies or series
         * @param {_} parent
         * @param {media} arguments (movie,tv) -> Required (movie as default)
         * @param {language} arguments (en-US) -> Optional (en-US as default) language on this format
         * @param {sortBy} arguments (popularity.asc, release_date.desc/asc, revenue.desc/asc, primary_release_date.desc/asc) -> Optional (popularity.asc as default)
         * @param {primaryReleaseDateGTE} arguments (year as string) -> Optional (2018 as default)
         * @param {dataSources} fetch data from moviesAPI
         * @returns if media set return series discover list otherwise return movies list
         */
        getDiscover: async (_, { media, language, sortBy, primaryReleaseDateGTE }, { dataSources }) => {
          const whatToTarget = "discover";
          try {
            return dataSources.moviesApi.getDiscover(whatToTarget, media, language, sortBy, primaryReleaseDateGTE);
          } catch (error) {
            console.log(error);
          }
        },

        /**
         * Resolver to fetch data for Upcoming movies / Now Playing Movies / Top Rated Movies / Popular Movies / Similar or Recommendations Movies
         * @param {_} parent
         * @param {whatToTarget} arguments (now_playing, upcoming, top_rated, popular, similar, recommendations) -> Required (now_playing as default)
         * @param {media} arguments (movie, tv) -> Required (movie as default)
         * @param {language} arguments (en-US) -> Optional (en-US as default)
         * @param {page} arguments (1,2,...) -> Optional (1 as default)
         * @param {region} arguments (US,FR,EN,...) -> Optional (US as default)
         * @param {id} arguments -> Required if use Similar or Recommendations otherwise its optional
         * @param {dataSources} fetch data from moviesAPI
         * @returns if whatToTarget set to similar or recommendations an id is Required and it will display a list of similar/recommendations movies
         *          otherwise it will return result for now_playing/upcoming/top_rated/popular movies
         */
        getUpcomTopRatedPopuNowPlaying: async (_, { whatToTarget, language, page, region, id }, { dataSources }) => {
          const media = "movie";
          try {
            return dataSources.moviesApi.getUpcomTopRatedPopuNowPlaying(media, whatToTarget, language, page, region, id);
          } catch (error) {
            console.log(error);
          }
        },

        /**
         * Resolver to fetch data for Upcoming movies / Now Playing Movies / Top Rated Movies / Popular Movies / Similar or Recommendations Movies
         * @param {_} parent
         * @param {whatToTarget} arguments (now_playing, upcoming, top_rated, popular, similar, recommendations) -> Required (now_playing as default)
         * @param {media} arguments (movie, tv) -> Required (movie as default)
         * @param {language} arguments (en-US) -> Optional (en-US as default)
         * @param {page} arguments (1,2,...) -> Optional (1 as default)
         * @param {region} arguments (US,FR,EN,...) -> Optional (US as default)
         * @param {id} arguments -> Required if use Similar or Recommendations otherwise its optional
         * @param {dataSources} fetch data from moviesAPI
         * @returns if whatToTarget set to similar or recommendations an id is Required and it will display a list of similar/recommendations movies
         *          otherwise it will return result for now_playing/upcoming/top_rated/popular movies
         */
         getUpcomTopRatedPopuNowPlayingTV: async (_, { whatToTarget, language, page, id }, { dataSources }) => {
          const media = "tv";
          const region = "";
          try {
            return dataSources.moviesApi.getUpcomTopRatedPopuNowPlaying(media, whatToTarget, language, page, region, id);
          } catch (error) {
            console.log(error);
          }
        },

        /**
         *  Resolver to credits of a movie
         * @param {_} parent
         * @param {id} arguments id of the movie -> Required
         * @param {language} arguments (en-US) -> Optional (en-US as default) language on this format
         * @param {dataSources} fetch data from moviesAPI
         * @returns return object containing list of cast and crew
         */
        getCredits: async (_, { id, language }, { dataSources }) => {
          try {
            return dataSources.moviesApi.getCredits(id, language);
          } catch (error) {
            console.log(error);
          }
        },

        /**
         *  Resolver to get the certifications for TV and Movies
         * @param {_} parent
         * @param {media} arguments (movie, tv) -> Optional (movie as default)
         * @param {dataSources} fetch data from moviesAPI
         * @returns return object containing list of certifications
         */
        getCertifications: async (_, { media }, { dataSources }) => {
          const whatToTarget = "certification";
          const isNotCertif = false;
          try {
            return dataSources.moviesApi.getCertifOrGenresOrCompany(isNotCertif, whatToTarget, media);
          } catch (error) {
            console.log(error);
          }
        },

        /**
         *  Resolver to get the genres for TV and Movies
         * @param {_} parent
         * @param {media} arguments (movie, tv) -> Optional (movie as default)
         * @param {dataSources} fetch data from moviesAPI
         * @returns return object containing list of genres
         */
        getGenres: async (_, { media }, { dataSources }) => {
          const whatToTarget = "genre";
          const isNotCertif = false;
          try {
            return dataSources.moviesApi.getCertifOrGenresOrCompany(isNotCertif, whatToTarget, media);
          } catch (error) {
            console.log(error);
          }
        },

        /**
         *  Resolver to get the Production Company
         * @param {_} parent
         * @param {id} arguments Required (id of the company)
         * @param {dataSources} fetch data from moviesAPI
         * @returns return object containing Company detail
         */
        getCompany: async (_, { id }, { dataSources }) => {
          const whatToTarget = "company"
          const media = "";
          const isNotCertif = true;
          try {
            return dataSources.moviesApi.getCertifOrGenresOrCompany(isNotCertif, whatToTarget, media, id);
          } catch (error) {
            console.log(error);
          }
        },

        /**
         *  Resolver to get the Network
         * @param {_} parent
         * @param {id} arguments Required (id of the Network)
         * @param {dataSources} fetch data from moviesAPI
         * @returns return object containing Network detail
         */
         getNetwork: async (_, { id }, { dataSources }) => {
          const whatToTarget = "network"
          const media = "";
          const isNotCertif = true;
          try {
            return dataSources.moviesApi.getCertifOrGenresOrCompany(isNotCertif, whatToTarget, media, id);
          } catch (error) {
            console.log(error);
          }
        },

        /**
         *  Resolver to get People
         * @param {_} parent
         * @param {id} arguments Required (id of the People)
         * @param {language} arguments Optional -> en-Us as default
         * @param {appendToResponse} arguments -> null as default
         * @param {dataSources} fetch data from moviesAPI
         * @returns return object containing People detail
         */
         getPeople: async (_, { id, language, appendToResponse }, { dataSources }) => {
          try {
            return dataSources.moviesApi.getPeopleWithAppendToResponse(id, language, appendToResponse);
          } catch (error) {
            console.log(error);
          }
        },

        /**
         *  Resolver to get People
         * @param {_} parent
         * @param {id} arguments Required (id of the People)
         * @param {language} arguments Optional -> en-Us as default
         * @param {appendToResponse} arguments -> null as default
         * @param {dataSources} fetch data from moviesAPI
         * @returns return object containing People detail
         */
        getSeason: async (_, { tvId, seasonNumber, language, appendToResponse }, { dataSources }) => {
          try {
            return dataSources.moviesApi.getTVSeasons(tvId, seasonNumber, language, appendToResponse);
          } catch (error) {
            console.log(error);
          }
        },
    }
}