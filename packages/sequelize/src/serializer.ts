import { SequelizeVisitor } from '@/visitor';
import { ParseTree, Serializer } from '@qliaison/core';
import { WhereOptions } from '@sequelize/core';

export class SequelizeSerializer<T> extends Serializer<WhereOptions<T>> {
  serialize(parseTree: ParseTree): WhereOptions<T> {
    const visitor = new SequelizeVisitor();
    return visitor.visitRoot(parseTree);
  }
}
