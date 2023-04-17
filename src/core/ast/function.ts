import type { Visitor } from '../visitor';
import { AstNode } from './ast';

export class FunctionNode extends AstNode {

    identifier: string;
    parameters: AstNode[];

    constructor(identifier: string, parameters: AstNode[]) {
        super();
        this.identifier = identifier;
        this.parameters = parameters;
    }

    accept<T>(v: Visitor<T>): unknown {
        return v.visitFunctionNode(this);
    }

}

export default FunctionNode;