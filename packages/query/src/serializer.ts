import { QueryVisitor } from '@/visitor';
import { ParseTree, Serializer } from '@qliaison/core';

export class QuerySerializer extends Serializer<string> {
  serialize(parseTree: ParseTree): string {
    const visitor = new QueryVisitor();
    return visitor.visitRoot(parseTree);
  }
}
