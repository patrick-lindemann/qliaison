import { Serializer } from '@base/serializer';
import { ParseTree } from '@base/types';
import { WhereOptions } from '@sequelize/core';
import { PrismaVisitor } from './visitor';

export class PrismaSerializer<T> extends Serializer<WhereOptions<T>> {
  serialize(parseTree: ParseTree): WhereOptions<T> {
    const visitor = new PrismaVisitor();
    return visitor.visitRoot(parseTree);
  }
}
