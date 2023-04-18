/* Types */

export type Type = typeof types[number];

export type Value = null | boolean | number | string;

/* Constants */

export const types = [
    'null',
    'boolean',
    'integer',
    'float',
    'string'
];