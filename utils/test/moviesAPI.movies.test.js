import {MoviesAPI} from '../moviesAPI.js';
import {
  mockMovieIDResponse,
  mockLatestMovie,
  mockDiscoverMovie,
  mockUpcomingMovie,
  mockCredits,
  mockCertificationsMovies,
  mockGenreMovies,
  mockCollectionMovies
} from './mock/movies.mock.js';

const mocks = {
    get: jest.fn(),
}

const ds = new MoviesAPI();

ds.get = mocks.get;

describe('[MoviesAPI.getMovie]', () => {
    it('Properly return an object containing a Movie find with its ID', async () => {
        // If API response contain a Movie with the required ID,
        // res should be an object containing the movie detail
        mocks.get.mockReturnValueOnce([mockMovieIDResponse]);
        const whatToTarget = "movie";
        const movieId = "181812";
        const language = "en-US";
        const res = await ds.getMovieOrTV(whatToTarget, movieId, language);

        expect(res).toEqual([mockMovieIDResponse]);
        expect(mocks.get).toBeCalledWith(expect.anything());
    })
})

describe('[MoviesAPI.getLatestMovie]', () => {
    it('Properly return an object containing The Latest Movie', async () => {
        // If API response contain the latest movie,
        // res should be an object containing the movie detail
        mocks.get.mockReturnValueOnce([mockLatestMovie]);
        const whatToTarget = "movie";
        const language = "en-US";
        const movieId = undefined;
        const res = await ds.getMovieOrTV(whatToTarget, movieId, language);

        expect(res).toEqual([mockLatestMovie]);
        expect(mocks.get).toBeCalledWith(expect.anything());
    })
})

describe('[MoviesAPI.getDiscoverMovie]', () => {
  it('Properly return an object containing a list of Movie to Discover', async () => {
      // If API response contain a list of movie,
      // res should be an object containing the movie detail
      mocks.get.mockReturnValueOnce([mockDiscoverMovie]);
      const media = "movie";
      const language = "en-US";
      const res = await ds.getDiscover(media, language);

      expect(res).toEqual([mockDiscoverMovie]);
      expect(mocks.get).toBeCalledWith(expect.anything());
  })
})

describe('[MoviesAPI.getPopularTopRatedMovies]', () => {
  it('Properly return an object containing a list of Popular/Top rated Movie', async () => {
      // If API response contain a list of movie,
      // res should be an object containing the movie detail
      mocks.get.mockReturnValueOnce([mockDiscoverMovie]);
      const media = "movie";
      const whatToTarget = "popular";
      const language = "en-US";
      const res = await ds.getUpcomTopRatedPopuNowPlaying(media,whatToTarget, language);

      expect(res).toEqual([mockDiscoverMovie]);
      expect(mocks.get).toBeCalledWith(expect.anything());
  })
})

describe('[MoviesAPI.getSimilarRecommendationsMovies]', () => {
  it('Properly return an object containing a list of Similar/recommendations Movie based on a movieId', async () => {
      // If API response contain a list of movie,
      // res should be an object containing the movie detail
      mocks.get.mockReturnValueOnce([mockDiscoverMovie]);
      const media = "movie";
      const whatToTarget = "similar";
      const language = "en-US";
      const movieId = "181812";
      const res = await ds.getUpcomTopRatedPopuNowPlaying(media,whatToTarget, language, movieId);

      expect(res).toEqual([mockDiscoverMovie]);
      expect(mocks.get).toBeCalledWith(expect.anything());
  })
})

describe('[MoviesAPI.getUpcomingNowPlayingMovies]', () => {
  it('Properly return an object containing a list of Upcoming/Now Playing Movie', async () => {
      // If API response contain a list of movie,
      // res should be an object containing the movie detail
      mocks.get.mockReturnValueOnce([mockUpcomingMovie]);
      const media = "movie";
      const whatToTarget = "upcoming";
      const language = "en-US";
      const res = await ds.getUpcomTopRatedPopuNowPlaying(media,whatToTarget, language);

      expect(res).toEqual([mockUpcomingMovie]);
      expect(mocks.get).toBeCalledWith(expect.anything());
  })
})

describe('[MoviesAPI.getCreditsMovies]', () => {
  it('Properly return an object containing a list Cast and Crew for a Movie', async () => {
      // If API response contain a list of cast and crew for a movie,
      // res should be an object containing the credits detail
      mocks.get.mockReturnValueOnce([mockCredits]);
      const media = "movie";
      const id = "181812";
      const language = "en-US";
      const res = await ds.getCredits(media,id, language);

      expect(res).toEqual([mockCredits]);
      expect(mocks.get).toBeCalledWith(expect.anything());
  })
})

describe('[MoviesAPI.getCertificationsMovies]', () => {
  it('Properly return an object containing a list Certifications for Movies', async () => {
      // If API response contain a list of Certifications for movies,
      // res should be an object containing the certifications detail
      mocks.get.mockReturnValueOnce([mockCertificationsMovies]);
      const media = "movie";
      const language = "en-US";
      const whatToTarget = "certification";
      const isNotCertif = false;
      const res = await ds.getCertifOrGenresOrCompany(isNotCertif, whatToTarget, media, language);
      expect(res).toEqual([mockCertificationsMovies]);
      expect(mocks.get).toBeCalledWith(expect.anything());
  })
})

describe('[MoviesAPI.getGenresMovies]', () => {
  it('Properly return an object containing a list Genres for Movies', async () => {
      // If API response contain a list of Genres for movies,
      // res should be an object containing the movie detail
      mocks.get.mockReturnValueOnce([mockGenreMovies]);
      const media = "movie";
      const language = "en-US";
      const whatToTarget = "genres";
      const isNotCertif = false;
      const res = await ds.getCertifOrGenresOrCompany(isNotCertif, whatToTarget, media, language);
      expect(res).toEqual([mockGenreMovies]);
      expect(mocks.get).toBeCalledWith(expect.anything());
  })
})

describe('[MoviesAPI.getCollectionMovies]', () => {
  it('Properly return an object containing a list Collection for Movies', async () => {
      // If API response contain a list of Collection for movies,
      // res should be an object containing the Collection detail
      mocks.get.mockReturnValueOnce([mockCollectionMovies]);
      const language = "en-US";
      const collectionID = "10";
      const res = await ds.getCollection(collectionID, language);
      expect(res).toEqual([mockCollectionMovies]);
      expect(mocks.get).toBeCalledWith(expect.anything());
  })
})