import type { Visitor } from 'base/visitor';
import { AstNode } from './ast';

export class Variable extends AstNode {
  constructor(public identifier: string) {
    super();
    this.identifier = identifier;
  }
  accept<T>(visitor: Visitor<T>): unknown {
    return visitor.visitVariable(this);
  }
}
