import { UserInputError, AuthenticationError  } from "apollo-server-express";
import isEmail from 'isemail';
import bcrypt from 'bcrypt';

const dateOptions = { timeZone: 'Europe/Brussels' };
const dateNow = new Date().toLocaleString('fr-FR', dateOptions);

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

    // Resolver for TVMovieUnion
    TVMovieUnion: {
      __resolveType(obj) {
        if (obj.media_type === "movie") {
          return 'MoviesDiscover'
        }
        if (obj.media_type === "tv") {
          return 'TVDiscover'
        }
      }
    },

    // Resolver for TrendingUnion
    TrendingUnion: {
      __resolveType(obj) {
        if (obj.media_type === "movie") {
          return 'MoviesDiscover'
        }
        if (obj.media_type === "tv") {
          return 'TVDiscover'
        }
        if (obj.media_type === "person") {
          return 'TrendingPeople'
        }
      }
    },

    // Resolver for SearchCompOrCollUnion
    SearchCompOrCollUnion: {
      __resolveType(obj) {
        if (obj.name && !obj.original_name) {
          return 'ProductionCompanies'
        }
        if (obj.original_name) {
          return 'SearchCollection'
        }
        return null
      }
    },

    // Resolver for MovieTVPeopleUnion
    MovieTVPeopleUnion: {
      __resolveType(obj) {
        if (obj.title && !obj.known_for) {
          return 'MoviesDiscover'
        }
        if (obj.name && !obj.known_for) {
          return 'TVDiscover'
        }
        if (obj.known_for) {
          return 'TrendingPeople'
        }
      }
    },

    Query: {
        /**
         *  Resolver to Fetch one movie if id is provided otherwise latest movie added is fetch
         * @param {_} parent
         * @param {id} arguments of the movie if not provided latest movie added will be fetch -> Optional
         * @param {language} arguments (en-US) -> Optional (en-US as default) language on this format
         * @param {dataSources} fetch data from moviesAPI
         * @param {user} context Check if the user is LoggedIn
         * @returns if ID is provided a movie if no ID provided so the latest movie added to TMDB is return
         */
        getMovie: async (_, { id, language }, { dataSources, user }) => {
            if(!user) throw new AuthenticationError('you must be logged in');
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
         * @param {user} context Check if the user is LoggedIn
         * @returns if ID is provided a movie if no ID provided so the latest movie added to TMDB is return
         */
        getSerie: async (_, { id, language, appendToResponse }, { dataSources, user }) => {
          if(!user) throw new AuthenticationError('you must be logged in');
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
         * @param {user} context Check if the user is LoggedIn
         * @returns if media set return series discover list otherwise return movies list
         */
        getDiscover: async (_, { media, language, sortBy, primaryReleaseDateGTE, page }, { dataSources, user }) => {
          if(!user) throw new AuthenticationError('you must be logged in');
          const whatToTarget = "discover";
          try {
            return dataSources.moviesApi.getDiscover(whatToTarget, media, language, sortBy, primaryReleaseDateGTE, page);
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
         * @param {user} context Check if the user is LoggedIn
         * @returns if whatToTarget set to similar or recommendations an id is Required and it will display a list of similar/recommendations movies
         *          otherwise it will return result for now_playing/upcoming/top_rated/popular movies
         */
        getUpcomTopRatedPopuNowPlaying: async (_, { whatToTarget, language, page, region, id }, { dataSources, user }) => {
          if(!user) throw new AuthenticationError('you must be logged in');
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
         * @param {user} context Check if the user is LoggedIn
         * @returns if whatToTarget set to similar or recommendations an id is Required and it will display a list of similar/recommendations movies
         *          otherwise it will return result for now_playing/upcoming/top_rated/popular movies
         */
        getUpcomTopRatedPopuNowPlayingTV: async (_, { whatToTarget, language, page, id }, { dataSources, user }) => {
          if(!user) throw new AuthenticationError('you must be logged in');
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
         * @param {user} context Check if the user is LoggedIn
         * @returns return object containing list of cast and crew
         */
        getCredits: async (_, { id, language }, { dataSources, user }) => {
          if(!user) throw new AuthenticationError('you must be logged in');
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
         * @param {user} context Check if the user is LoggedIn
         * @returns return object containing list of certifications
         */
        getCertifications: async (_, { media, language }, { dataSources, user }) => {
          if(!user) throw new AuthenticationError('you must be logged in');
          const whatToTarget = "certification";
          const isNotCertif = false;
          try {
            return dataSources.moviesApi.getCertifOrGenresOrCompany(isNotCertif, whatToTarget, media, language);
          } catch (error) {
            console.log(error);
          }
        },

        /**
         *  Resolver to get the genres for TV and Movies
         * @param {_} parent
         * @param {media} arguments (movie, tv) -> Optional (movie as default)
         * @param {dataSources} fetch data from moviesAPI
         * @param {user} context Check if the user is LoggedIn
         * @returns return object containing list of genres
         */
        getGenres: async (_, { media, language }, { dataSources, user }) => {
          if(!user) throw new AuthenticationError('you must be logged in');
          const whatToTarget = "genre";
          const isNotCertif = false;
          try {
            return dataSources.moviesApi.getCertifOrGenresOrCompany(isNotCertif, whatToTarget, media, language);
          } catch (error) {
            console.log(error);
          }
        },

        /**
         *  Resolver to get the Production Company
         * @param {_} parent
         * @param {id} arguments Required (id of the company)
         * @param {dataSources} fetch data from moviesAPI
         * @param {user} context Check if the user is LoggedIn
         * @returns return object containing Company detail
         */
        getCompany: async (_, { id, language }, { dataSources, user }) => {
          if(!user) throw new AuthenticationError('you must be logged in');
          const whatToTarget = "company"
          const media = "";
          const isNotCertif = true;
          try {
            return dataSources.moviesApi.getCertifOrGenresOrCompany(isNotCertif, whatToTarget, media, id, language);
          } catch (error) {
            console.log(error);
          }
        },

        /**
         *  Resolver to get the Network
         * @param {_} parent
         * @param {id} arguments Required (id of the Network)
         * @param {dataSources} fetch data from moviesAPI
         * @param {user} context Check if the user is LoggedIn
         * @returns return object containing Network detail
         */
        getNetwork: async (_, { id, language }, { dataSources, user }) => {
          if(!user) throw new AuthenticationError('you must be logged in');
          const whatToTarget = "network"
          const media = "";
          const isNotCertif = true;
          try {
            return dataSources.moviesApi.getCertifOrGenresOrCompany(isNotCertif, whatToTarget, media, id, language);
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
         * @param {user} context Check if the user is LoggedIn
         * @returns return object containing People detail
         */
        getPeople: async (_, { id, language, appendToResponse }, { dataSources, user }) => {
          if(!user) throw new AuthenticationError('you must be logged in');
          try {
            return dataSources.moviesApi.getPeopleWithAppendToResponse(id, language, appendToResponse);
          } catch (error) {
            console.log(error);
          }
        },

        /**
         *  Resolver to get a Season for a TV Show
         * @param {_} parent
         * @param {tvId} arguments Required (id of the TV Show)
         * @param {seasonNumber} arguments Required (Number of the season for the TV Show)
         * @param {language} arguments Optional -> en-Us as default
         * @param {appendToResponse} arguments -> null as default
         * @param {dataSources} fetch data from moviesAPI
         * @param {user} context Check if the user is LoggedIn
         * @returns return object containing Season for a TV Show detail
         */
        getSeason: async (_, { tvId, seasonNumber, language, appendToResponse }, { dataSources, user }) => {
          if(!user) throw new AuthenticationError('you must be logged in');
          try {
            return dataSources.moviesApi.getTVSeasons(tvId, seasonNumber, language, appendToResponse);
          } catch (error) {
            console.log(error);
          }
        },

        /**
         *  Resolver to get an Episode of a Season for a TV Show
         * @param {_} parent
         * @param {tvId} arguments Required (id of the TV Show)
         * @param {seasonNumber} arguments Required (Number of the season for the TV Show)
         * @param {episodeNumber} arguments Required (Number of the episode for the TV Show)
         * @param {language} arguments Optional -> en-Us as default
         * @param {appendToResponse} arguments -> null as default
         * @param {dataSources} fetch data from moviesAPI
         * @param {user} context Check if the user is LoggedIn
         * @returns return object containing Episode for a TV Show detail
         */
        getEpisode: async (_, { tvId, seasonNumber, episodeNumber, language, appendToResponse }, { dataSources, user }) => {
          if(!user) throw new AuthenticationError('you must be logged in');
          try {
            return dataSources.moviesApi.getTVEpisodes(tvId, seasonNumber, episodeNumber, language, appendToResponse);
          } catch (error) {
            console.log(error);
          }
        },

        /**
         *  Function to get Trending
         * @param {_} parent
         * @param {mediaType} arguments Required (parameter between all,movie,tv,person) -> all as default
         * @param {timeWindow} arguments Required (time window to fetch data betwee day,week) -> week as default
         * @param {language} arguments Optional -> en-Us as default
         * @param {dataSources} fetch data from moviesAPI
         * @param {user} context Check if the user is LoggedIn
         * @returns return object containing TV/Movie/Person detail
         */
        getTrending: async (_, { mediaType, timeWindow, language, page }, { dataSources, user }) => {
          if(!user) throw new AuthenticationError('you must be logged in');
          try {
            return dataSources.moviesApi.getTrending(mediaType, timeWindow, language, page);
          } catch (error) {
            console.log(error);
          }
        },

        /**
         *  Resolver to get a Collection for a movie
         * @param {_} parent
         * @param {collectionID} arguments Required ID of the collection
         * @param {language} arguments Optional -> en-Us as default
         * @param {dataSources} fetch data from moviesAPI
         * @param {user} context Check if the user is LoggedIn
         * @returns return object containing Movie detail part of a collection
         */
        getCollection: async (_, { collectionID, language }, { dataSources, user }) => {
          if(!user) throw new AuthenticationError('you must be logged in');
          try {
            return dataSources.moviesApi.getCollection(collectionID, language);
          } catch (error) {
            console.log(error);
          }
        },

        /**
         *  Resolver to get Search result for Collection or Company
         * @param {_} parent
         * @param {whatToTarget} arguments Required (parameter between company,collection) -> movie as default
         * @param {query} arguments Required what you are looking for
         * @param {language} arguments Optional -> en-Us as default
         * @param {page} arguments Optional -> 1 as default
         * @param {dataSources} fetch data from moviesAPI
         * @param {user} context Check if the user is LoggedIn
         * @returns return object containing result for search of company or collection
         */
        getSearchCompOrColl: async (_, { whatToTarget, query, language, page }, { dataSources, user }) => {
          if(!user) throw new AuthenticationError('you must be logged in');
          try {
            return dataSources.moviesApi.getSearch(whatToTarget, query, language, page);
          } catch (error) {
            console.log(error);
          }
        },

        /**
         *  Resolver to get Search result for movie, tv or person
         * @param {_} parent
         * @param {whatToTarget} arguments Required (parameter between movie,person,tv) -> movie as default
         * @param {query} arguments Required what you are looking for
         * @param {language} arguments Optional -> en-Us as default
         * @param {page} arguments Optional -> 1 as default
         * @param {includeAdult} arguments Optional -> false as default
         * @param {region} arguments Optional -> US as default
         * @param {primaryReleaseYear} arguments Optional -> null as default (work for movie and tv)
         * @param {year} arguments Optional -> null as default (for movie)
         * @param {dataSources} fetch data from moviesAPI
         * @param {user} context Check if the user is LoggedIn
         * @returns return object containing result for search of movie, tv or person
         */
        getSearchMoviesTVOrPeople: async (_, { whatToTarget, query, language, page, includeAdult, region, primaryReleaseYear, year }, { dataSources, user }) => {
          if(!user) throw new AuthenticationError('you must be logged in');
          try {
            return dataSources.moviesApi.getSearch(whatToTarget, query, language, page, includeAdult, region, primaryReleaseYear, year);
          } catch (error) {
            console.log(error);
          }
        },

        /**
         *  Resolver to get Search result for multi search
         * @param {_} parent
         * @param {query} arguments Required what you are looking for
         * @param {language} arguments Optional -> en-Us as default
         * @param {page} arguments Optional -> 1 as default
         * @param {includeAdult} arguments Optional -> false as default
         * @param {region} arguments Optional -> US as default
         * @param {dataSources} fetch data from moviesAPI
         * @param {user} context Check if the user is LoggedIn
         * @returns return object containing result for search of multi
         */
         getSearchMulti: async (_, { query, language, page, includeAdult, region }, { dataSources, user }) => {
          if(!user) throw new AuthenticationError('you must be logged in');
           const whatToTarget = "multi";
          try {
            return dataSources.moviesApi.getSearch(whatToTarget, query, language, page, includeAdult, region);
          } catch (error) {
            console.log(error);
          }
        },

        /**
         *  Resolver to get an User from the context
         * @param {_} parent
         * @param {dataSources} fetch data from users
         * @param {user} context Check if the user is LoggedIn
         * @returns return object user
         */
        getUser: async (_, __, { dataSources, user }) => {
          // if(!user) throw new AuthenticationError('you must be logged in');
          user.token = Buffer.from(user.email).toString('base64');
          return user;
        },

      /**
       *  Resolver to logged in an user with its email and password
       * @param {_} parent
       * @param {email} Required email of the user
       * @param {password} Required password of the user
       * @param {dataSources} fetch data from users
       * @param {user} context Check if the user is LoggedIn
       * @returns return object user
      */
      loginUser: async (_, { email, password }, { dataSources }) => {
        const user = await dataSources.users.findOneByEmailAndPassword(email);
        const userInputError = {}
        if(user) {
          const passMatch = await bcrypt.compare(password, user.password);
          if(passMatch) {
            user.token = Buffer.from(email).toString('base64');
            return user;
          } else if (user.password !== password) {
            userInputError.wrongPassword = 'Wrong Password!!';
          }
        } else if(!user) {
          userInputError.userNotExist = 'The user does not exist';
        }

        if (Object.keys(userInputError).length > 0) {
          throw new UserInputError('Failed to get events due to validation errors', { userInputError })
        }
      },
    },

    Movie: {
      belongs_to_collection: (par, __, { dataSources, user }) => {
        try {
          return dataSources.moviesApi.getCollection(par.belongs_to_collection.id);
        } catch (error) {
          console.log(error);
        }
      }
    },

    Mutation: {
       /**
       *  Resolver to register a new user with its email and password
       * @param {_} parent
       * @param {email} Required email of the user
       * @param {password} Required password of the user
       * @param {dataSources} fetch data from users
       * @param {user} context Check if the user is LoggedIn
       * @returns return object user
      */
      registerUser: async (_, { email, password, subscriptionPlan, specialOffers }, { dataSources }) => {
        const userInputError = {};
        const existingUser = await dataSources.users.findOneByEmailAndPassword(email);
        if(!isEmail.validate(email)) {
          userInputError.wrongEmailFormat = 'This is not an email address';
        } else {
          if(!existingUser) {
            if (password.length > 8) {
              const data = {
                email,
                password,
                subscriptionPlan,
                specialOffers,
                created_at: dateNow,
                updated_at: dateNow,
                profiles: []
              };
              const salt = await bcrypt.genSalt(10);
              data.password = await bcrypt.hash(data.password, salt);
              const user =  await dataSources.users.insertNewUser(data);
              user.token = Buffer.from(email).toString('base64');
              return user;
            } else {
              userInputError.passwordLengthError = 'Password must have minimum 8 characters';
            }
          } else {
            userInputError.userAlreadyExist = 'The email is already use';
          }
        }

        if (Object.keys(userInputError).length > 0) {
          throw new UserInputError('Failed to get events due to validation errors', { userInputError })
        }
      },

      /**
       *  Resolver to update an user
       * @param {_} parent
       * @param {userDetail} Required Object containing the field to update
       * @param {dataSources} fetch data from users
       * @param {user} context Check if the user is LoggedIn
       * @returns return object user
      */
      updateUser: async (_, { userDetail }, { dataSources, user }) => {
        if(!user) throw new AuthenticationError('you must be logged in');
        userDetail.updated_at = dateNow;
        console.log(userDetail);
        const myUsers = await dataSources.users.updateUser(userDetail);
        myUsers.token = Buffer.from(myUsers.email).toString('base64');
        return myUsers;
      },

      /**
       *  Resolver to remove an user
       * @param {_} parent
       * @param {dataSources} fetch data from users
       * @param {user} context Check if the user is LoggedIn
       * @returns return object user
      */
      removeUser: async (_, __, { dataSources, user }) => {
        if(!user) throw new AuthenticationError('you must be logged in');
        const removeUsers = await dataSources.users.removeUser();
        return removeUsers;
      }
    }
}