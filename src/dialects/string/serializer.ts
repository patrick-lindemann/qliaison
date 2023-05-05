import { Serializer } from 'base/serializer';
import { ParseTree } from 'base/types';
import { StringVisitor } from './visitor';

export class StringSerializer extends Serializer<string> {
  serialize(parseTree: ParseTree): string {
    const visitor = new StringVisitor();
    return visitor.visitRoot(parseTree);
  }
}
