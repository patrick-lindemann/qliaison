import { SequelizeVisitor } from '@/visitor';
import { Serializer } from '@qliaison/core/serializer';
import { ParseTree } from '@qliaison/core/types';
import { WhereOptions } from '@sequelize/core';

export class SequelizeSerializer<T> extends Serializer<WhereOptions<T>> {
  serialize(parseTree: ParseTree): WhereOptions<T> {
    const visitor = new SequelizeVisitor();
    return visitor.visitRoot(parseTree);
  }
}
