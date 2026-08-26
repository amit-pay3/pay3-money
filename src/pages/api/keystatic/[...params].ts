import { makeGenericHandler } from '@keystatic/core/api/generic';
import { createHandler } from '@keystatic/astro/api';
import config from '../../../keystatic.config';

export const all = createHandler(makeGenericHandler(config));
