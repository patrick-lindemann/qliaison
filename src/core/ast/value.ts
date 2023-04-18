import type { Type } from '../lang/types';
import type { Visitor } from '../visitor';
import { AstNode } from './ast';

export class ValueNode extends AstNode {

    type: Type;
    value: any;

    constructor(type: Type, value: any) {
        super();
        this.type = type;
        this.value = value;
    }

    accept<T>(v: Visitor<T>): unknown {
        return v.visitValueNode(this);
    }

}

export default ValueNode;