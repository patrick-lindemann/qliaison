import { Comparator, LogicOperator } from '@qliaison/core';

/* Types */

export type SymbolTable = {
  [key in Comparator | LogicOperator]: string;
};

/* Constants */

export const symbols: SymbolTable = {
  not: 'not',
  and: 'and',
  or: 'or',
  eq: '=',
  neq: '!=',
  lt: '<',
  lte: '<=',
  gt: '>',
  gte: '>=',
  like: '~',
  not_like: '!~',
  i_like: '~~',
  not_i_like: '!~~',
  in: 'in',
  not_in: 'not in'
} as const;
