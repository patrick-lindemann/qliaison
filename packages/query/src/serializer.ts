import { QueryVisitor } from '@/visitor';
import { Serializer } from '@qliaison/core/serializer';
import { ParseTree } from '@qliaison/core/types';

export class QuerySerializer extends Serializer<string> {
  serialize(parseTree: ParseTree): string {
    const visitor = new QueryVisitor();
    return visitor.visitRoot(parseTree);
  }
}
