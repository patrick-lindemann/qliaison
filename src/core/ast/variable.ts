import type { Visitor } from '../visitor';
import { AstNode } from './ast';

export class VariableNode extends AstNode {

    identifier: string;

    constructor(identifier: string) {
        super();
        this.identifier = identifier;
    }

    accept<T>(v: Visitor<T>): unknown {
        return v.visitVariableNode(this);
    }

}

export default VariableNode;