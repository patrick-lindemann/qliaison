export const operators = [
    'not',
    'and',
    'or',
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'like',
    'is_empty',
    'is_not_empty',
    'is_null',
    'is_not_null',
    'in',
    'not_in'
];

export type Operator = typeof operators[number];