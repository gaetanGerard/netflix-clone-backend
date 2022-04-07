import { RESTDataSource } from 'apollo-datasource-rest';
import dotenv from 'dotenv';

dotenv.config();


export class MoviesAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://api.themoviedb.org/3/"
    }

    /**
     *  Function to Fetch one movie or Serie if id is provided otherwise latest movie or Serie added is fetch
     * @param {whatToTarget} arguments define in resolver
     * @param {id} arguments of the movie if not provided latest movie added will be fetch -> Optional
     * @param {language} arguments (en-US) -> Optional (en-US as default) language on this format
     * @param {appendToResponse} arguments (null) -> Optional can append aggregate_credits,credits or images to the object
     * @returns if ID is provided a movie or Serie if no ID provided so the latest movie or Serie added to TMDB is return
     */
    async getMovieOrTV(whatToTarget, id, language = "en-US", appendToResponse = null) {
        if(id) {
            if (appendToResponse === null) {
                return this.get(`${whatToTarget}/${encodeURIComponent(id)}?api_key=${process.env.TMDB_API_KEY}&language=${language}`)
            } else {
                return this.get(`${whatToTarget}/${encodeURIComponent(id)}?api_key=${process.env.TMDB_API_KEY}&language=${language}&append_to_response=${appendToResponse}`)
            }
        } else {
            return this.get(`${whatToTarget}/latest?api_key=${process.env.TMDB_API_KEY}&language=${language}`)
        }

    }

    /**
     *  Function to Fetch a Discover list of movies or series
     * @param {whatToTarget} arguments (discover) -> Optional (discover as default)
     * @param {media} arguments (movie,tv) -> Required (movie as default)
     * @param {language} arguments (en-US) -> Optional (en-US as default) language on this format
     * @param {sortBy} arguments (popularity.asc, release_date.desc/asc, revenue.desc/asc, primary_release_date.desc/asc) -> Optional (popularity.asc as default)
     * @param {primaryReleaseDateGTE} arguments (year as string) -> Optional (2018 as default)
     * @returns if media set return series discover list otherwise return movies list
     */
    async getDiscover(whatToTarget = "discover", media = "movie", language = "en-US", sortBy = "popularity.desc", primaryReleaseDateGTE = "2018", page = 1) {
        if(media === "movie") {
            return this.get(`${whatToTarget}/${media}?api_key=${process.env.TMDB_API_KEY}&language=${language}&sort_by=${sortBy}&primary_release_date.gte=${primaryReleaseDateGTE}&page=${page}`)
        } else {
            return this.get(`${whatToTarget}/${media}?api_key=${process.env.TMDB_API_KEY}&language=${language}&sort_by=${sortBy}&air_date.gte=${primaryReleaseDateGTE}&page=${page}`)
        }

    }

    /**
     * Function to fetch data for Upcoming movies / Now Playing Movies / Top Rated Movies/TV / Popular Movies/TV / Similar or Recommendations Movies/TV / On The air and Airing Today TV
     * @param {whatToTarget} arguments (now_playing, upcoming, top_rated, popular, similar, recommendations) -> Required (now_playing as default)
     * @param {media} arguments (movie, tv) -> Required (movie as default)
     * @param {language} arguments (en-US) -> Optional (en-US as default)
     * @param {page} arguments (1,2,...) -> Optional (1 as default)
     * @param {region} arguments (US,FR,EN,...) -> Optional (US as default)
     * @param {id} arguments -> Required if use Similar or Recommendations otherwise its optional
     * @returns if whatToTarget set to similar or recommendations an id is Required and it will display a list of similar/recommendations movies
     *          otherwise it will return result for now_playing/upcoming/top_rated/popular movies
     */
    async getUpcomTopRatedPopuNowPlaying(media, whatToTarget = "now_playing", language = "en-US", page = "1", region = "US", id) {
        if(whatToTarget === "similar" || whatToTarget === "recommendations") {
            if(media === "tv" && (id === null || id.length === 0 )) {
                return this.get(`${media}/${whatToTarget}?api_key=${process.env.TMDB_API_KEY}&language=${language}&page=${page}`)
            } else {
                return this.get(`${media}/${encodeURIComponent(id)}/${whatToTarget}?api_key=${process.env.TMDB_API_KEY}&language=${language}&page=${page}`)
            }
        } else {
            return this.get(`${media}/${whatToTarget}?api_key=${process.env.TMDB_API_KEY}&language=${language}&page=${page}&region=${region}`)
        }
    }

    /**
     *  Function to credits of a movie
     * @param {id} arguments id of the movie -> Required
     * @param {language} arguments (en-US) -> Optional (en-US as default) language on this format
     * @returns return object containing list of cast and crew
     */
    async getCredits(id, language = "en-US") {
        return this.get(`movie/${encodeURIComponent(id)}/credits?api_key=${process.env.TMDB_API_KEY}&language=${language}`)
    }

    /**
     *  Function to get the certifications or genres for TV and Movies
     * @param {isNotCertif} arguments is define in resolver -> false as default
     * @param {whatToTarget} arguments is define in resolver
     * @param {media} arguments (movie, tv) -> Optional (movie as default)
     * @param {id} arguments  is Required if company is set
     * @returns return object containing list of certifications or Genres or companies
     */
    async getCertifOrGenresOrCompany(isNotCertif = false, whatToTarget = "certification", media = "movie", id) {
        if(isNotCertif === true) {
            return this.get(`${whatToTarget}/${encodeURIComponent(id)}?api_key=${process.env.TMDB_API_KEY}`)
        } else if (isNotCertif === false) {
            return this.get(`${whatToTarget}/${media}/list?api_key=${process.env.TMDB_API_KEY}`)
        }

    }

    /**
     *  Function to get People
     * @param {id} arguments Required (id of the People)
     * @param {language} arguments Optional -> en-Us as default
     * @param {appendToResponse} arguments -> null as default
     * @returns return object containing People detail
     */
     async getPeopleWithAppendToResponse(id, language = "en-US", appendToResponse = null) {
         if(appendToResponse === null) {
            return this.get(`person/${encodeURIComponent(id)}?api_key=${process.env.TMDB_API_KEY}&language=${language}`)
         } else if (appendToResponse){
            return this.get(`person/${encodeURIComponent(id)}?api_key=${process.env.TMDB_API_KEY}&language=${language}&append_to_response=${appendToResponse}`)
         }

    }

    /**
     *  Function to get TV Seasons
     * @param {tvId} arguments Required (id of the TV Show)
     * @param {seasonNumber} arguments Required (Number of the season for the TV Show)
     * @param {language} arguments Optional -> en-Us as default
     * @param {appendToResponse} arguments -> null as default
     * @returns return object containing Season detail
     */
    async getTVSeasons(tvId, seasonNumber = "1", language = "en-US", appendToResponse = null) {
        if(appendToResponse === null) {
            return this.get(`tv/${encodeURIComponent(tvId)}/season/${seasonNumber}?api_key=${process.env.TMDB_API_KEY}&language=${language}`)
        } else if (appendToResponse){
            return this.get(`tv/${encodeURIComponent(tvId)}/season/${seasonNumber}?api_key=${process.env.TMDB_API_KEY}&language=${language}&append_to_response=${appendToResponse}`)
        }
    }

    /**
     *  Function to get TV Episode
     * @param {tvId} arguments Required (id of the TV Show)
     * @param {seasonNumber} arguments Required (Number of the season for the TV Show)
     * @param {episodeNumber} arguments Required (Number of the Episode for the TV Show)
     * @param {language} arguments Optional -> en-Us as default
     * @param {appendToResponse} arguments -> null as default
     * @returns return object containing Season detail
     */
    async getTVEpisodes(tvId, seasonNumber = "1", episodeNumber = "1", language = "en-US", appendToResponse = null) {
        if(appendToResponse === null) {
            return this.get(`tv/${encodeURIComponent(tvId)}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${process.env.TMDB_API_KEY}&language=${language}`)
        } else if (appendToResponse){
            return this.get(`tv/${encodeURIComponent(tvId)}/season/${seasonNumber}/episode/${episodeNumber}?api_key=${process.env.TMDB_API_KEY}&language=${language}&append_to_response=${appendToResponse}`)
        }
    }

    /**
     *  Function to get Trending
     * @param {mediaType} arguments Required (parameter between all,movie,tv,person) -> all as default
     * @param {timeWindow} arguments Required (time window to fetch data betwee day,week) -> week as default
     * @param {language} arguments Optional -> en-Us as default
     * @returns return object containing TV/Movie/Person detail
     */
    async getTrending(mediaType = "all", timeWindow = "week", language = "en-US", page = "1") {
        return this.get(`trending/${mediaType}/${timeWindow}?api_key=${process.env.TMDB_API_KEY}&language=${language}&page=${page}`)
    }

    /**
     *  Function to get a Collection for a movie
     * @param {collectionID} arguments Required ID of the collection
     * @param {language} arguments Optional -> en-Us as default
     * @returns return object containing Movie detail part of a collection
     */
    async getCollection(collectionID, language = "en-US") {
        return this.get(`collection/${encodeURIComponent(collectionID)}?api_key=${process.env.TMDB_API_KEY}&language=${language}`)
    }

    /**
     *  Function to get Search Result
     * @param {whatToTarget} arguments Required (parameter between company,collection,movie,multi,person,tv) -> movie as default
     * @param {query} arguments Required what you are looking for
     * @param {language} arguments Optional -> en-Us as default
     * @param {page} arguments Optional -> 1 as default
     * @param {includeAdult} arguments Optional -> false as default
     * @param {region} arguments Optional -> US as default
     * @param {firstAirDateYear} arguments Optional -> 1900 as default (work for movie and tv)
     * @param {year} arguments Optional -> 1900 as default (for movie)
     * @returns return object containing result of your search
     */
    async getSearch(whatToTarget, query, language = "en-US", page = "1", includeAdult = false, region = "US", firstAirDateYear, year) {
        switch (whatToTarget) {
            case "movie":
                return this.get(`search/${whatToTarget}?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=${language}&page=${page}&include_adult=${includeAdult}&region=${region}&primary_release_year=${firstAirDateYear}&year=${year}`)
            case "tv":
                return this.get(`search/${whatToTarget}?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=${language}&page=${page}&include_adult=${includeAdult}&first_air_date_year=${firstAirDateYear}`);
            case "person":
            case "multi":
                return this.get(`search/${whatToTarget}?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=${language}&page=${page}&include_adult=${includeAdult}&region=${region}`);
            default:
                return this.get(`search/${whatToTarget}?api_key=${process.env.TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=${language}&page=${page}`)
        }
    }
}