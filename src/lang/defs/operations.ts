import {
    InfixOperationNode,
    PostfixOperationNode,
    PrefixOperationNode
} from 'core/ast';
import { Array, Number, String, Value } from './values';
import { Variable } from './variables';

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
    constructor(right: Condition | Comparison) {
        super('not', right);
    }
}

export class And extends InfixOperationNode {
    constructor(left: Condition | Comparison, right: Condition | Comparison) {
        super('and', left, right);
    }
}

export class Or extends InfixOperationNode {
    constructor(left: Condition | Comparison, right: Condition | Comparison) {
        super('or', left, right);
    }
}

// Comparators

export class Equals extends InfixOperationNode {
    constructor(left: Variable, right: Value) {
        super('eq', left, right);
    }
}

export class NotEquals extends InfixOperationNode {
    constructor(left: Variable, right: Value) {
        super('neq', left, right);
    }
}

export class LessThan extends InfixOperationNode {
    constructor(left: Variable, right: Number) {
        super('lt', left, right);
    }
}

export class LessThanEquals extends InfixOperationNode {
    constructor(left: Variable, right: Number) {
        super('lte', left, right);
    }
}

export class GreaterThan extends InfixOperationNode {
    constructor(left: Variable, right: Number) {
        super('gt', left, right);
    }
}

export class GreaterThanEquals extends InfixOperationNode {
    constructor(left: Variable, right: Number) {
        super('gte', left, right);
    }
}

export class Like extends InfixOperationNode {
    constructor(left: Variable, right: String) {
        super('like', left, right);
    }
}

export class IsNull extends PostfixOperationNode {
    constructor(left: Variable) {
        super('is_null', left);
    }
}

export class IsNotNull extends PostfixOperationNode {
    constructor(left: Variable) {
        super('is_not_null', left);
    }
}

export class IsEmpty extends PostfixOperationNode {
    constructor(left: Variable) {
        super('is_empty', left);
    }
}

export class IsNotEmpty extends PostfixOperationNode {
    constructor(left: Variable) {
        super('is_not_empty', left);
    }
}

export class In extends InfixOperationNode {
    constructor(left: Variable, right: Array<Value>) {
        super('in', left, right);
    }
}

export class NotIn extends InfixOperationNode {
    constructor(left: Variable, right: Array<Value>) {
        super('not_in', left, right);
    }
}