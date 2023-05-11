import { WhereOptions } from '@sequelize/core';
import { Root } from 'base/ast';
import { Parser } from 'base/parser';

export class SequelizeParser<T> extends Parser<WhereOptions<T>> {
  parse(input: WhereOptions<T>): Root {
    return new Root();
  }
}
