import { gql } from "apollo-server-express";

import {book} from './book.js';
import {author} from './author.js';
import {query} from './query.js';

export const schema = gql`
    ${book}
    ${author}
    ${query}
`;