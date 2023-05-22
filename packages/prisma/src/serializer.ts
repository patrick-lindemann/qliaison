import { PrismaVisitor } from '@/visitor';
import { Serializer } from '@qliaison/core/serializer';
import { ParseTree } from '@qliaison/core/types';
import { WhereOptions } from '@sequelize/core';

export class PrismaSerializer<T> extends Serializer<WhereOptions<T>> {
  serialize(parseTree: ParseTree): WhereOptions<T> {
    const visitor = new PrismaVisitor();
    return visitor.visitRoot(parseTree);
  }
}
