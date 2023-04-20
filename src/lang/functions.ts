import { AstNode, FunctionNode } from 'core/ast';

/* Classes */

export class Function extends FunctionNode {
    constructor(identifier: string, ...parameters: AstNode[]) {
        super(identifier, ...parameters);
    }
}