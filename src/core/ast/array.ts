import type { Visitor } from 'core/visitor';
import { AstNode } from './ast';
import type { Value } from './value';

/* Classes */

export class Array<ItemType extends AstNode = Value> extends AstNode {
    constructor(public items: AstNode[]) {
        super();
        this.items = items;
    }
    accept<T>(visitor: Visitor<T>): unknown {
        return visitor.visitArray<ItemType>(this);
    }
}