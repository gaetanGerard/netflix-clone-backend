import { gql } from "apollo-server-express";

import {movie} from './movie.js';
import {query} from './query.js';

import {spokenLanguages} from './spokenLanguages.js';
import {productionCountries} from './productionCountries.js';
import {productionCompanies} from './productionCompanies.js';
import {genre} from './genre.js';
import {collection} from './collection.js';
import {movieResult} from './movieResult.js';
import {moviesDiscover} from './moviesDiscover.js';
import {upcomingAndNowPlayingMovie} from './upcomingAndNowPlayingMovie.js';
import {movieCredits} from './movieCredits.js';
import {cast} from './cast.js';
import {crew} from './crew.js';
import {certifications} from './certifications.js';
import {company} from './company.js';


export const schema = gql`
    ${collection}
    ${genre}
    ${productionCompanies}
    ${productionCountries}
    ${spokenLanguages}
    ${movieResult}
    ${movie}
    ${moviesDiscover}
    ${upcomingAndNowPlayingMovie}
    ${cast}
    ${crew}
    ${movieCredits}
    ${certifications}
    ${company}
    ${query}
`;