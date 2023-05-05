import { Serializer } from 'base/serializer';
import { ParseTree } from 'base/types';
import { QueryVisitor } from './visitor';

export class QuerySerializer extends Serializer<string> {
  serialize(parseTree: ParseTree): string {
    const visitor = new QueryVisitor();
    return visitor.visitRoot(parseTree);
  }
}
