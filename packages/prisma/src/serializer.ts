import { PrismaVisitor } from '@/visitor';
import { ParseTree, Serializer } from '@qliaison/core';

export class PrismaSerializer<T> extends Serializer<unknown> {
  serialize(parseTree: ParseTree): unknown {
    const visitor = new PrismaVisitor();
    return visitor.visitRoot(parseTree);
  }
}
