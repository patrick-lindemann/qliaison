import type { Visitor } from '../visitor';
import { AstNode } from './ast';

export type ValueType = string;

export class ValueNode extends AstNode {

    type: ValueType;
    value: any;

    constructor(type: ValueType, value: any) {
        super();
        this.type = type;
        this.value = value;
    }

    accept<T>(v: Visitor<T>): unknown {
        return v.visitValueNode(this);
    }

}

export default ValueNode;