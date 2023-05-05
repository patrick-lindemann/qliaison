import { Root } from 'base/ast';
import { Serializer } from 'base/serializer';
import { StringVisitor } from './visitor';

export class StringSerializer extends Serializer<string> {
  serialize(parseTree: Root): string {
    const visitor = new StringVisitor();
    return visitor.visitRoot(parseTree);
  }
}
