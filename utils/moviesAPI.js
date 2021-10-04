import { RESTDataSource } from 'apollo-datasource-rest';
import dotenv from 'dotenv';

dotenv.config();


export class MoviesAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://api.themoviedb.org/3/"
    }

    /**
     *  Resolver to Fetch one movie if id is provided otherwise latest movie added is fetch
     * @param {id} arguments of the movie if not provided latest movie added will be fetch -> Optional
     * @param {language} arguments (en-US) -> Optional (en-US as default) language on this format
     * @returns if ID is provided a movie if no ID provided so the latest movie added to TMDB is return
     */
    async getMovie(id, language = "en-US") {
        if(id) {
            return this.get(`movie/${encodeURIComponent(id)}?api_key=${process.env.TMDB_API_KEY}&language=${language}`)
        } else {
            return this.get(`movie/latest?api_key=${process.env.TMDB_API_KEY}&language=${language}`)
        }

    }

    /**
     *  Resolver to Fetch a Discover list of movies or series
     * @param {whatToTarget} arguments (discover) -> Optional (discover as default)
     * @param {media} arguments (movie,tv) -> Required (movie as default)
     * @param {language} arguments (en-US) -> Optional (en-US as default) language on this format
     * @param {sortBy} arguments (popularity.asc, release_date.desc/asc, revenue.desc/asc, primary_release_date.desc/asc) -> Optional (popularity.asc as default)
     * @param {primaryReleaseDateGTE} arguments (year as string) -> Optional (2018 as default)
     * @returns if media set return series discover list otherwise return movies list
     */
    async getDiscover(whatToTarget = "company", media = "movie", language = "en-US", sortBy = "popularity.desc", primaryReleaseDateGTE = "2018") {
        if(media === "movie") {
            return this.get(`${whatToTarget}/${media}?api_key=${process.env.TMDB_API_KEY}&language=${language}&sort_by=${sortBy}&primary_release_date.gte=${primaryReleaseDateGTE}`)
        } else {
            return this.get(`${whatToTarget}/${media}?api_key=${process.env.TMDB_API_KEY}&language=${language}&sort_by=${sortBy}&air_date.gte=${primaryReleaseDateGTE}`)
        }

    }

    /**
     * Function to fetch data for Upcoming movies / Now Playing Movies / Top Rated Movies / Popular Movies / Similar or Recommendations Movies
     * @param {whatToTarget} arguments (now_playing, upcoming, top_rated, popular, similar, recommendations) -> Required (now_playing as default)
     * @param {media} arguments (movie, tv) -> Required (movie as default)
     * @param {language} arguments (en-US) -> Optional (en-US as default)
     * @param {page} arguments (1,2,...) -> Optional (1 as default)
     * @param {region} arguments (US,FR,EN,...) -> Optional (US as default)
     * @param {id} arguments -> Required if use Similar or Recommendations otherwise its optional
     * @returns if whatToTarget set to similar or recommendations an id is Required and it will display a list of similar/recommendations movies
     *          otherwise it will return result for now_playing/upcoming/top_rated/popular movies
     */
    async getUpcomTopRatedPopuNowPlaying(whatToTarget = "now_playing", language = "en-US", page = "1", region = "US", id) {
        if(whatToTarget === "similar" || whatToTarget === "recommendations") {
            return this.get(`movie/${encodeURIComponent(id)}/${whatToTarget}?api_key=${process.env.TMDB_API_KEY}&language=${language}&page=${page}`)
        } else {
            return this.get(`movie/${whatToTarget}?api_key=${process.env.TMDB_API_KEY}&language=${language}&page=${page}&region=${region}`)
        }
    }

    /**
     *  Resolver to credits of a movie
     * @param {id} arguments id of the movie -> Required
     * @param {language} arguments (en-US) -> Optional (en-US as default) language on this format
     * @returns return object containing list of cast and crew
     */
    async getCredits(id, language = "en-US") {
        return this.get(`movie/${encodeURIComponent(id)}/credits?api_key=${process.env.TMDB_API_KEY}&language=${language}`)
    }

    /**
     *  Resolver to get the certifications for TV and Movies
     * @param {_} parent
     * @param {media} arguments (movie, tv) -> Optional (movie as default)
     * @returns return object containing list of certifications
     */
    async getCertifications(media = "movie") {
         return this.get(`certification/${media}/list?api_key=${process.env.TMDB_API_KEY}`)
    }
}