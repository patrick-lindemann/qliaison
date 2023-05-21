import { Serializer } from '@base/serializer';
import { ParseTree } from '@base/types';
import { WhereOptions } from '@sequelize/core';
import { SequelizeVisitor } from './visitor';

export class SequelizeSerializer<T> extends Serializer<WhereOptions<T>> {
  serialize(parseTree: ParseTree): WhereOptions<T> {
    const visitor = new SequelizeVisitor();
    return visitor.visitRoot(parseTree);
  }
}
