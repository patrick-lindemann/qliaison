import { Comparator, LogicOperator } from 'base/ast/operation';

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
  in: 'in',
  not_in: 'not in'
} as const;