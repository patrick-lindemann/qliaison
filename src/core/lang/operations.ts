import {
    AstNode,
    InfixOperationNode,
    PostfixOperationNode,
    PrefixOperationNode
} from 'core/ast';

/* Types */

export type Operator = typeof operators[number];

export type Condition
    = Not
    | And
    | Or;

export type Comparison
    = Equals
    | NotEquals
    | LessThan
    | LessThanEquals
    | GreaterThan
    | GreaterThanEquals
    | Like
    | IsNull
    | IsNotNull
    | IsEmpty
    | IsNotNull
    | In;

/* Constants */

export const operators = [
    'not',
    'and',
    'or',
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'like',
    'is_empty',
    'is_not_empty',
    'is_null',
    'is_not_null',
    'in',
    'not_in'
];

/* Classes */

// Logical Operators

export class Not extends PrefixOperationNode {
    constructor(right: AstNode) {
        super('not', right);
    }
}

export class And extends InfixOperationNode {
    constructor(left: AstNode, right: AstNode) {
        super(left, 'and', right);
    }
}

export class Or extends InfixOperationNode {
    constructor(left: AstNode, right: AstNode) {
        super(left, 'or', right);
    }
}

// Comparators

export class Equals extends InfixOperationNode {
    constructor(left: AstNode, right: AstNode) {
        super(left, 'eq', right);
    }
}

export class NotEquals extends InfixOperationNode {
    constructor(left: AstNode, right: AstNode) {
        super(left, 'neq', right);
    }
}

export class LessThan extends InfixOperationNode {
    constructor(left: AstNode, right: AstNode) {
        super(left, 'lt', right);
    }
}

export class LessThanEquals extends InfixOperationNode {
    constructor(left: AstNode, right: AstNode) {
        super(left, 'lte', right);
    }
}

export class GreaterThan extends InfixOperationNode {
    constructor(left: AstNode, right: AstNode) {
        super(left, 'gt', right);
    }
}

export class GreaterThanEquals extends InfixOperationNode {
    constructor(left: AstNode, right: AstNode) {
        super(left, 'gte', right);
    }
}

export class Like extends InfixOperationNode {
    constructor(left: AstNode, right: AstNode) {
        super(left, 'like', right);
    }
}

export class IsNull extends PostfixOperationNode {
    constructor(left: AstNode) {
        super(left, 'is_null');
    }
}

export class IsNotNull extends PostfixOperationNode {
    constructor(left: AstNode) {
        super(left, 'is_not_null');
    }
}

export class IsEmpty extends PostfixOperationNode {
    constructor(left: AstNode) {
        super(left, 'is_empty');
    }
}

export class IsNotEmpty extends PostfixOperationNode {
    constructor(left: AstNode) {
        super(left, 'is_not_empty');
    }
}

export class In extends InfixOperationNode {
    constructor(left: AstNode, right: AstNode) {
        super(left, 'in', right);
    }
}

export class NotIn extends InfixOperationNode {
    constructor(left: AstNode, right: AstNode) {
        super(left, 'not_in', right);
    }
}