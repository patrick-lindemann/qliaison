import { Op } from '@sequelize/core';
import { Operator } from 'base/ast';

export const symbols: Partial<{ [operator in Operator]: symbol }> = {
  and: Op.and,
  eq: Op.eq,
  gt: Op.gt,
  gte: Op.gte,
  in: Op.in,
  like: Op.like,
  lt: Op.lt,
  lte: Op.lte,
  neq: Op.ne,
  not_in: Op.notIn,
  not: Op.not,
  or: Op.or
};
