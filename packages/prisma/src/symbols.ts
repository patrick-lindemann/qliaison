import { Operator } from '@qliaison/core';

// https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#filter-conditions-and-operators

export const symbols: Partial<{ [operator in Operator]: string }> = {
  not: 'NOT',
  and: 'AND',
  or: 'OR',
  eq: 'equals',
  neq: 'not',
  lt: 'lt',
  lte: 'lte',
  gt: 'gt',
  gte: 'gte',
  in: 'in',
  not_in: 'notIn'
};
