import {MoviesAPI} from '../moviesAPI.js';
import {
    mockPeopleWhitoutAppendToResponse,
    mockPeopleWithAppendToResponse
} from './mock/people.mock.js';

const mocks = {
    get: jest.fn(),
}

const ds = new MoviesAPI();

ds.get = mocks.get;

describe('[MoviesAPI.getPeopleWhitoutAppendToResponse]', () => {
    it('Properly return an object containing a People find with its ID whitout Append To Response Data', async () => {
        // If API response contain a People with the required ID,
        // res should be an object containing the People detail
        mocks.get.mockReturnValueOnce([mockPeopleWhitoutAppendToResponse]);
        let appendToResponse = null;
        const peopleId = "287";
        const language = "en-US";
        const res = await ds.getPeopleWithAppendToResponse(peopleId, language, appendToResponse);

        expect(res).toEqual([mockPeopleWhitoutAppendToResponse]);
        expect(mocks.get).toBeCalledWith(expect.anything());
    })
})

describe('[MoviesAPI.getPeopleWithAppendToResponse]', () => {
    it('Properly return an object containing a People find with its ID with Append To Response Data', async () => {
        // If API response contain a People with the required ID,
        // res should be an object containing the People detail
        mocks.get.mockReturnValueOnce([mockPeopleWithAppendToResponse]);
        let appendToResponse = "movie_credits,tv_credits,combined_credits,images";
        const peopleId = "287";
        const language = "en-US";
        const res = await ds.getPeopleWithAppendToResponse(peopleId, language, appendToResponse);

        expect(res).toEqual([mockPeopleWithAppendToResponse]);
        expect(mocks.get).toBeCalledWith(expect.anything());
    })
})