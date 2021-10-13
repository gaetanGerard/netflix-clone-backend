import {MoviesAPI} from '../moviesAPI.js';
import {
    mockSerieIdResponseWhitoutAppendToResponse,
    mockSerieIdRespWithAppendToResponse,
    mockDiscoverSerie,
    mockCertificationsSerie,
    mockGenreSerie
} from './mock/series.mock.js';

const mocks = {
    get: jest.fn(),
}

const ds = new MoviesAPI();

ds.get = mocks.get;

describe('[MoviesAPI.getSerie]', () => {
    it('Properly return an object containing a Serie find with its ID whitout Append To Response Data', async () => {
        // If API response contain a Serie with the required ID,
        // res should be an object containing the movie detail
        mocks.get.mockReturnValueOnce([mockSerieIdResponseWhitoutAppendToResponse]);
        const whatToTarget = "tv";
        const tvId = "1399";
        const language = "en-US";
        const res = await ds.getMovieOrTV(whatToTarget, tvId, language);

        expect(res).toEqual([mockSerieIdResponseWhitoutAppendToResponse]);
        expect(mocks.get).toBeCalledWith(expect.anything());
    })
})

describe('[MoviesAPI.getLatestSerie]', () => {
    it('Properly return an object containing a Serie find with its ID and with Append To Response Data', async () => {
        // If API response contain a Serie with the required ID with data from the append_to_response,
        // res should be an object containing the serie detail
        mocks.get.mockReturnValueOnce([mockSerieIdRespWithAppendToResponse]);
        const whatToTarget = "tv";
        const language = "en-US";
        const tvId = "1399";
        const appendToResponse = "aggregate_credits,credits,images";
        const res = await ds.getMovieOrTV(whatToTarget, tvId, language, appendToResponse);

        expect(res).toEqual([mockSerieIdRespWithAppendToResponse]);
        expect(mocks.get).toBeCalledWith(expect.anything());
    })
})

describe('[MoviesAPI.getDiscoverSeries]', () => {
    it('Properly return an object containing a list of Serie to Discover', async () => {
        // If API response contain a list of serie,
        // res should be an object containing the serie detail
        mocks.get.mockReturnValueOnce([mockDiscoverSerie]);
        const media = "tv";
        const language = "en-US";
        const res = await ds.getDiscover(media, language);

        expect(res).toEqual([mockDiscoverSerie]);
        expect(mocks.get).toBeCalledWith(expect.anything());
    })
})

describe('[MoviesAPI.getPopularTopRatedOnTheAirAiringTodaySeries]', () => {
    it('Properly return an object containing a list of popular/top rated/on_the_air/airing_today Serie', async () => {
        // If API response contain a list of serie,
        // res should be an object containing the serie detail
        mocks.get.mockReturnValueOnce([mockDiscoverSerie]);
        const media = "tv";
        const whatToTarget = "airing_today";
        const language = "en-US";
        const res = await ds.getUpcomTopRatedPopuNowPlaying(media,whatToTarget, language);

        expect(res).toEqual([mockDiscoverSerie]);
        expect(mocks.get).toBeCalledWith(expect.anything());
    })
})

describe('[MoviesAPI.getSimilarRecommendationsSeries]', () => {
    it('Properly return an object containing a list of Similar/recommendations Serie based on a serieId', async () => {
        // If API response contain a list of movie,
        // res should be an object containing the movie detail
        mocks.get.mockReturnValueOnce([mockDiscoverSerie]);
        const media = "tv";
        const whatToTarget = "recommendations";
        const language = "en-US";
        const serieId = "1399";
        const page = "1";
        const region = "US"
        const res = await ds.getUpcomTopRatedPopuNowPlaying(media,whatToTarget, language,page, region, serieId);

        expect(res).toEqual([mockDiscoverSerie]);
        expect(mocks.get).toBeCalledWith(expect.anything());
    })
})

describe('[MoviesAPI.getCertificationsSeries]', () => {
    it('Properly return an object containing a list Certifications for Series', async () => {
        // If API response contain a list of Certifications for Series,
        // res should be an object containing the certifications detail
        mocks.get.mockReturnValueOnce([mockCertificationsSerie]);
        const media = "tv";
        const language = "en-US";
        const whatToTarget = "certification";
        const isNotCertif = false;
        const res = await ds.getCertifOrGenresOrCompany(isNotCertif, whatToTarget, media, language);
        expect(res).toEqual([mockCertificationsSerie]);
        expect(mocks.get).toBeCalledWith(expect.anything());
    })
})

describe('[MoviesAPI.getGenresSeries]', () => {
    it('Properly return an object containing a list Genres for Series', async () => {
        // If API response contain a list of Genres for Series,
        // res should be an object containing the Genres detail
        mocks.get.mockReturnValueOnce([mockGenreSerie]);
        const media = "tv";
        const language = "en-US";
        const whatToTarget = "genres";
        const isNotCertif = false;
        const res = await ds.getCertifOrGenresOrCompany(isNotCertif, whatToTarget, media, language);
        expect(res).toEqual([mockGenreSerie]);
        expect(mocks.get).toBeCalledWith(expect.anything());
    })
})
