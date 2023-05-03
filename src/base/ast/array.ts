import type { Visitor } from 'base/visitor';
import { AstNode } from './node';

/* Classes */

export class Array<ItemType extends AstNode> extends AstNode {
  constructor(public items: AstNode[]) {
    super();
    this.items = items;
  }
  accept<T>(visitor: Visitor<T>): unknown {
    return visitor.visitArray<ItemType>(this);
  }
}
