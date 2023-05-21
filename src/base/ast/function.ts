import type { Visitor } from '@base/visitor';
import { AstNode } from './node';

/* Classes */

export class Function extends AstNode {
  constructor(public identifier: string, public parameters: AstNode[]) {
    super();
    this.identifier = identifier;
    this.parameters = parameters;
  }
  accept<T>(visitor: Visitor<T>): unknown {
    return visitor.visitFunction(this);
  }
}
