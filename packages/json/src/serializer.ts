import { JsonVisitor } from '@/visitor';
import { ParseTree, Serializer } from '@qliaison/core';

export class JsonSerializer extends Serializer<object> {
  serialize(parseTree: ParseTree): object {
    const visitor = new JsonVisitor();
    return visitor.visitRoot(parseTree);
  }
}
