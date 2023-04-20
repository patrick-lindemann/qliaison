import { VariableNode } from 'core/ast';

/* Classes */

export class Variable extends VariableNode {
    constructor(identifier: string) {
        super(identifier);
    }
}