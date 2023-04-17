import type { Visitor } from '../visitor';
import { AstNode } from './ast';

export class ArrayNode extends AstNode {

    items: AstNode[];

    constructor(...items: AstNode[]) {
        super();
        this.items = items;
    }

    accept<T>(v: Visitor<T>): unknown {
        return v.visitArrayNode(this);
    }

}

export default ArrayNode;