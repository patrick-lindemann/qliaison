import { ParseTree, Serializer } from '@qliaison/core';
import { QueryVisitor, QueryVisitorOptions } from './visitor';

export type QuerySerializerOptions = QueryVisitorOptions;

export class QuerySerializer extends Serializer<string> {
  options: QuerySerializerOptions = {
    parantheses: false,
    condesed: false
  };

  constructor(options: Partial<QuerySerializerOptions> = {}) {
    super();
    this.options = { ...this.options, ...options };
  }

  serialize(parseTree: ParseTree): string {
    const visitor = new QueryVisitor(this.options);
    return visitor.visitRoot(parseTree);
  }
}
