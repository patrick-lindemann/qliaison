import type { Visitor } from 'base/visitor';
import { AstNode } from './ast';
import type { Inable } from './comparison';
import type { Value } from './value';

/* Classes */

export class Array<ItemType extends AstNode = Value>
  extends AstNode
  implements Inable
{
  constructor(public items: AstNode[]) {
    super();
    this.items = items;
  }
  accept<T>(visitor: Visitor<T>): unknown {
    return visitor.visitArray<ItemType>(this);
  }
}
