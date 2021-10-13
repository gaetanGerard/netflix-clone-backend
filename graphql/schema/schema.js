import { gql } from "apollo-server-express";

import {query} from './query.js';
import {union} from './union.js';
import {mutation} from './mutation.js';
import {input} from './input.js';

import {utilities} from './utilities.js';
import {images} from './images.js';
import {discover} from './discover.js';
import {credits} from './credits.js';
import {certifications} from './certifications.js';
import {networks} from './networks.js';
import {people} from './people.js';
import {movie} from './movie.js';
import {tvSeasons} from './tvSeasons.js';
import {tvEpisodes} from './tvEpisodes.js';
import {tv} from './tv.js';
import {trending} from './trending.js';
import {collection} from './collection.js';
import {search} from './search.js';
import {users} from './users.js';


export const schema = gql`
    ${utilities}
    ${images}
    ${discover}
    ${credits}
    ${certifications}
    ${networks}
    ${people}
    ${movie}
    ${tv}
    ${tvSeasons}
    ${tvEpisodes}
    ${trending}
    ${collection}
    ${search}
    ${users}
    ${union}
    ${query}
    ${mutation}
    ${input}
`;