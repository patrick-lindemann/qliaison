import type { Visitor } from '../visitor';
import { AstNode } from './node';

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
