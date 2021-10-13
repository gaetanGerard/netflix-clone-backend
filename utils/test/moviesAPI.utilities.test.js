import {MoviesAPI} from '../moviesAPI.js';
import {
    mockCompany,
    mockNetwork
} from './mock/utilities.mock.js';

const mocks = {
    get: jest.fn(),
}

const ds = new MoviesAPI();

ds.get = mocks.get;

describe('[MoviesAPI.getCompany]', () => {
    it('Properly return an object containing a Company find with its ID', async () => {
        // If API response contain a Company with the required ID,
        // res should be an object containing the Company detail
        mocks.get.mockReturnValueOnce([mockCompany]);
        const language = "en-US";
        const whatToTarget = "company"
        const media = "";
        const isNotCertif = true;
        const id = "1"
        const res = await ds.getCertifOrGenresOrCompany(isNotCertif, whatToTarget, media, id, language);

        expect(res).toEqual([mockCompany]);
        expect(mocks.get).toBeCalledWith(expect.anything());
    })
})

describe('[MoviesAPI.getNetwork]', () => {
    it('Properly return an object containing a Network find with its ID', async () => {
        // If API response contain a Network with the required ID,
        // res should be an object containing the Network detail
        mocks.get.mockReturnValueOnce([mockNetwork]);
        const language = "en-US";
        const whatToTarget = "network"
        const media = "";
        const isNotCertif = true;
        const id = "213"
        const res = await ds.getCertifOrGenresOrCompany(isNotCertif, whatToTarget, media, id, language);

        expect(res).toEqual([mockNetwork]);
        expect(mocks.get).toBeCalledWith(expect.anything());
    })
})