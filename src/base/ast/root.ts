import type { Visitor } from 'base/visitor';
import { AstNode } from './ast';

/* Classes */

export class Root extends AstNode {
  constructor(public child?: AstNode) {
    super();
    this.child = child;
  }
  accept<T>(visitor: Visitor<T>): T {
    return visitor.visitRoot(this);
  }
}
