import { gql } from "apollo-server-express";

// import {inter} from './interface.js';
// import {union} from './union.js';
import {movie} from './movie.js';
import {query} from './query.js';

import {spokenLanguages} from './spokenLanguages.js';
import {productionCountries} from './productionCountries.js';
import {productionCompanies} from './productionCompanies.js';
import {genre} from './genre.js';
import {collection} from './collection.js';
import {movieResult} from './movieResult.js';
import {moviesDiscover} from './moviesDiscover.js';


export const schema = gql`
    ${collection}
    ${genre}
    ${productionCompanies}
    ${productionCountries}
    ${spokenLanguages}
    ${movieResult}
    ${movie}
    ${moviesDiscover}
    ${query}
`;