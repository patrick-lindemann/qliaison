import { Serializer } from '@base/serializer';
import { ParseTree } from '@base/types';
import { JsonVisitor } from './visitor';

export class JsonSerializer extends Serializer<object> {
  serialize(parseTree: ParseTree): object {
    const visitor = new JsonVisitor();
    return visitor.visitRoot(parseTree);
  }
}
