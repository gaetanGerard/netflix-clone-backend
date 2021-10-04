import { RESTDataSource } from 'apollo-datasource-rest';
import dotenv from 'dotenv';

dotenv.config();


export class MoviesAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://api.themoviedb.org/3/"
    }

    async getMovies(language = "en-US", sortBy = "popularity.desc", page = "1", primaryReleaseDateGTE = "2018") {
        return this.get(`discover/movie?api_key=${process.env.TMDB_API_KEY}&language=${language}&sort_by=${sortBy}&page=${page}&primary_release_date.gte=${primaryReleaseDateGTE}`)
    }

    async getMovie(id, language = "en-US") {
        return this.get(`movie/${encodeURIComponent(id)}?api_key=${process.env.TMDB_API_KEY}&language=${language}`)
    }

    async getSimilarOrRecommendationsMovie(id, whatToTarget = "similar", language = "en-US", page = "1") {
        return this.get(`movie/${encodeURIComponent(id)}/${whatToTarget}?api_key=${process.env.TMDB_API_KEY}&language=${language}&page=${page}`)
    }

    async getLatestMovie(language = "en-US") {
        return this.get(`movie/latest?api_key=${process.env.TMDB_API_KEY}&language=${language}`)
    }

    async getNowPlayingPopularTopRatedUpcomingMovie(whatToTarget = "now_playing", language = "en-US", page = "1", region = "US") {
        return this.get(`movie/${whatToTarget}?api_key=${process.env.TMDB_API_KEY}&language=${language}&page=${page}&region=${region}`)
    }

    async getMovieCredits(id, language = "en-US") {
        return this.get(`movie/${encodeURIComponent(id)}/credits?api_key=${process.env.TMDB_API_KEY}&language=${language}`)
    }

    async getGenres(media, language = "en-US") {
        return this.get(`genre/${media}/list?api_key=${process.env.TMDB_API_KEY}&language=${language}`)
    }

    async getCertifications(media) {
        return this.get(`certification/${media}/list?api_key=${process.env.TMDB_API_KEY}`)
    }

    async getCompanies(companyId) {
        return this.get(`company/${companyId}?api_key=${process.env.TMDB_API_KEY}`)
    }
}