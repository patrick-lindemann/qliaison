import type { Visitor } from '@/visitor';
import { AstNode } from './node';

export class Variable extends AstNode {
  constructor(public identifier: string) {
    super();
    this.identifier = identifier;
  }
  accept<T>(visitor: Visitor<T>): unknown {
    return visitor.visitVariable(this);
  }
}
