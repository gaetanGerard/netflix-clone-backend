import {MoviesAPI} from '../moviesAPI.js';
import {
    mockSearchCompany,
    mockSearchCollection,
    mockSearchMovies,
    mockSearchSeries,
    mockSearchPerson,
    mockSearchMulti
} from './mock/search.mock.js';

const mocks = {
    get: jest.fn(),
}

const ds = new MoviesAPI();

ds.get = mocks.get;

describe('[MoviesAPI.getSearchCompany]', () => {
    it('Properly return result of a company research', async () => {
        // If API response contain a list of Company,
        // res should be an object containing the result of a research
        mocks.get.mockReturnValueOnce([mockSearchCompany]);
        const language = "en-US";
        const whatToTarget = "company"
        const query = "sony picture";
        const page = "1";
        const res = await ds.getSearch(whatToTarget, query, language, page);

        expect(res).toEqual([mockSearchCompany]);
        expect(mocks.get).toBeCalledWith(expect.anything());
    })
})

describe('[MoviesAPI.getSearchCollection]', () => {
    it('Properly return result of a Collection research', async () => {
        // If API response contain a list of Collection,
        // res should be an object containing the result of a research
        mocks.get.mockReturnValueOnce([mockSearchCollection]);
        const language = "en-US";
        const whatToTarget = "collection"
        const query = "star wars";
        const page = "1";
        const res = await ds.getSearch(whatToTarget, query, language, page);

        expect(res).toEqual([mockSearchCollection]);
        expect(mocks.get).toBeCalledWith(expect.anything());
    })
})

describe('[MoviesAPI.getSearchMovies]', () => {
    it('Properly return result of a Movies research', async () => {
        // If API response contain a list of Movies,
        // res should be an object containing the result of a research
        mocks.get.mockReturnValueOnce([mockSearchMovies]);
        const language = "en-US";
        const whatToTarget = "movie"
        const query = "star wars";
        const page = "1";
        const res = await ds.getSearch(whatToTarget, query, language, page);

        expect(res).toEqual([mockSearchMovies]);
        expect(mocks.get).toBeCalledWith(expect.anything());
    })
})

describe('[MoviesAPI.getSearchSeries]', () => {
    it('Properly return result of a Series research', async () => {
        // If API response contain a list of Series,
        // res should be an object containing the result of a research
        mocks.get.mockReturnValueOnce([mockSearchSeries]);
        const language = "en-US";
        const whatToTarget = "tv"
        const query = "star wars";
        const page = "1";
        const res = await ds.getSearch(whatToTarget, query, language, page);

        expect(res).toEqual([mockSearchSeries]);
        expect(mocks.get).toBeCalledWith(expect.anything());
    })
})

describe('[MoviesAPI.getSearchPerson]', () => {
    it('Properly return result of a Person research', async () => {
        // If API response contain a list of Person,
        // res should be an object containing the result of a research
        mocks.get.mockReturnValueOnce([mockSearchPerson]);
        const language = "en-US";
        const whatToTarget = "person"
        const query = "mark hamill";
        const page = "1";
        const res = await ds.getSearch(whatToTarget, query, language, page);

        expect(res).toEqual([mockSearchPerson]);
        expect(mocks.get).toBeCalledWith(expect.anything());
    })
})

describe('[MoviesAPI.getSearchMulti]', () => {
    it('Properly return result of a Multi research', async () => {
        // If API response contain a list of Multi,
        // res should be an object containing the result of a research
        mocks.get.mockReturnValueOnce([mockSearchMulti]);
        const language = "en-US";
        const whatToTarget = "multi"
        const query = "star wars";
        const page = "1";
        const res = await ds.getSearch(whatToTarget, query, language, page);

        expect(res).toEqual([mockSearchMulti]);
        expect(mocks.get).toBeCalledWith(expect.anything());
    })
})