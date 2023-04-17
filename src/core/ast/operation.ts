import type { Visitor } from '../visitor';
import { AstNode } from './ast';
import type { Operator } from '../lang/operators';

export abstract class OperationNode extends AstNode {

    operator: Operator;

    constructor(operator: Operator) {
        super();
        this.operator = operator;
    }

}

export class PrefixOperationNode extends OperationNode {

    right: AstNode;

    constructor(operator: Operator, right: AstNode) {
        super(operator);
        this.right = right;
    }

    accept<T>(v: Visitor<T>): unknown {
        return v.visitPrefixOperatorNode(this);
    }

}

export class PostfixOperationNode extends OperationNode {

    left: AstNode;

    constructor(left: AstNode, operator: Operator) {
        super(operator);
        this.left = left;
    }

    accept<T>(v: Visitor<T>): unknown {
        return v.visitPostfixOperatorNode(this);
    }

}

export class InfixOperationNode extends OperationNode {

    left: AstNode;
    right: AstNode;

    constructor(left: AstNode, operator: Operator, right: AstNode) {
        super(operator);
        this.left = left;
        this.right = right;
    }

    accept<T>(v: Visitor<T>): unknown {
        return v.visitInfixOperatorNode(this);
    }

}