import { Visitor } from 'core/visitor';
import { AstNode } from './ast';

/* Abstract classes */

export abstract class Operation extends AstNode {
    constructor(public operator: string) {
        super();
        this.operator = operator;
    }
}

export abstract class UnaryOperation extends Operation {
    constructor(public operator: string, public value: AstNode) {
        super(operator);
    }
    accept<T>(visitor: Visitor<T>): unknown {
        return visitor.visitUnaryOperation(this);
    }
}

export abstract class BinaryOperation extends Operation {
    constructor(public operator: string, public left: AstNode, public right: AstNode) {
        super(operator);
        this.left = left;
        this.right = right;
    }
    accept<T>(visitor: Visitor<T>): unknown {
        return visitor.visitBinaryOperation(this);
    }
}