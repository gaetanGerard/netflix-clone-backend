import { RESTDataSource } from 'apollo-datasource-rest';
import dotenv from 'dotenv';

dotenv.config();


export class MoviesAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = "https://api.themoviedb.org/3/"
    }

    async getMovies(language = "en-EN", sortBy = "popularity.desc", page = "1", primaryReleaseDateGTE = "2018") {
        return this.get(`discover/movie?api_key=${process.env.TMDB_API_KEY}&language=${language}&sort_by=${sortBy}&page=${page}&primary_release_date.gte=${primaryReleaseDateGTE}`)
    }

    async getMovie(id, language = "en-EN") {
        return this.get(`movie/${encodeURIComponent(id)}?api_key=${process.env.TMDB_API_KEY}&language=${language}`)
    }
}