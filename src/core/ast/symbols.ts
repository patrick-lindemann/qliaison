import { Comparator } from './comparison';
import { ConditionOperator } from './condition';

/* Types */

export type SymbolTable = {
  [key: ConditionOperator | Comparator]: string;
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
  is: 'is',
  ist_not: 'is not',
  in: 'in',
  not_in: 'not in'
};
