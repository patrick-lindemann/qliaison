import { JsonVisitor } from '@/visitor';
import { Serializer } from '@qliaison/core/serializer';
import { ParseTree } from '@qliaison/core/types';

export class JsonSerializer extends Serializer<object> {
  serialize(parseTree: ParseTree): object {
    const visitor = new JsonVisitor();
    return visitor.visitRoot(parseTree);
  }
}
