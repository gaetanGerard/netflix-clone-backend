import { gql } from "apollo-server-express";

import {inter} from './interface.js';
import {union} from './union.js';
import {user} from './user.js';
import {director} from './director.js';
import {cast} from './cast.js';
import {writer} from './writer.js';
import {creator} from './creator.js';
import {genre} from './genre.js';
import {episode} from './episode.js';
import {season} from './season.js';
import {movie} from './movie.js';
import {serie} from './serie.js';
import {query} from './query.js';

export const schema = gql`
    ${inter}
    ${union}
    ${user}
    ${director}
    ${cast}
    ${writer}
    ${creator}
    ${genre}
    ${episode}
    ${season}
    ${movie}
    ${serie}
    ${query}
`;