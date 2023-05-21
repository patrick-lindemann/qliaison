import { Op } from '@sequelize/core';
import { Operator } from 'base/ast';

export const symbols: { [operator in Operator]: symbol } = {
  not: Op.not,
  and: Op.and,
  or: Op.or,
  eq: Op.eq,
  neq: Op.ne,
  lt: Op.lt,
  lte: Op.lte,
  gt: Op.gt,
  gte: Op.gte,
  like: Op.like,
  not_like: Op.notLike,
  i_like: Op.iLike,
  not_i_like: Op.notILike,
  in: Op.in,
  not_in: Op.notIn
};
