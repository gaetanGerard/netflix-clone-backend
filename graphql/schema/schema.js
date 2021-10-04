import { gql } from "apollo-server-express";

import {query} from './query.js';
import {union} from './union.js';

import {utilities} from './utilities.js';
import {discover} from './discover.js';
import {credits} from './credits.js';
import {movie} from './movie.js';


export const schema = gql`
    ${utilities}
    ${movie}
    ${discover}
    ${credits}
    ${union}
    ${query}

`;