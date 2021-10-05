import { gql } from "apollo-server-express";

import {query} from './query.js';
import {union} from './union.js';

import {utilities} from './utilities.js';
import {images} from './images.js';
import {discover} from './discover.js';
import {credits} from './credits.js';
import {certifications} from './certifications.js';
import {networks} from './networks.js';
import {people} from './people.js';
import {movie} from './movie.js';


export const schema = gql`
    ${utilities}
    ${images}
    ${movie}
    ${discover}
    ${credits}
    ${certifications}
    ${networks}
    ${people}
    ${union}
    ${query}

`;