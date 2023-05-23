import { ParseTree, Serializer } from '@qliaison/core';
import { QueryVisitor } from './visitor';

export class QuerySerializer extends Serializer<string> {
  serialize(parseTree: ParseTree): string {
    const visitor = new QueryVisitor();
    return visitor.visitRoot(parseTree);
  }
}
