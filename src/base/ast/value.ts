import type { Visitor } from 'base/visitor';
import { AstNode } from './ast';

/* Classes */

export class Value extends AstNode {
  constructor(public type: string, public value: any) {
    super();
    this.type = type;
    this.value = value;
  }
  accept<T>(visitor: Visitor<T>): unknown {
    return visitor.visitValue(this);
  }
}
