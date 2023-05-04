import { Visitor } from 'base/visitor';
import { Array } from './array';
import { AstNode } from './node';
import {
  BooleanValue,
  DateValue,
  EmptyValue,
  NullValue,
  NumberValue,
  StringValue,
  Value
} from './value';
import { Variable } from './variable';

/* Types */

export type Operator = LogicOperator | Comparator;
export type LogicOperator = (typeof logicOperators)[number];
export type Comparator = (typeof comparators)[number];

export type Condition = Not | And | Or;
export type Comparison =
  | Equals
  | NotEquals
  | LessThan
  | LessThanEquals
  | GreaterThan
  | GreaterThanEquals
  | Like
  | Is
  | IsNot
  | In
  | NotIn;

export type Comparable =
  | NullValue
  | BooleanValue
  | NumberValue
  | StringValue
  | DateValue;
export type Orderable = NumberValue | DateValue;
export type Likeable = StringValue;
export type Isable = NullValue | EmptyValue;
export type Inable = Array<Value>;

/* Constants */

export const logicOperators = ['not', 'and', 'or'] as const;

export const comparators = [
  'eq',
  'neq',
  'lt',
  'lte',
  'gt',
  'gte',
  'like',
  'is',
  'is_not',
  'in',
  'not_in'
] as const;

/* Abstract Classes */

export abstract class Operation extends AstNode {
  constructor(public operator: Operator) {
    super();
    this.operator = operator;
  }
}

/* Classes */

export class UnaryOperation extends Operation {
  constructor(public operator: Operator, public right: AstNode) {
    super(operator);
    this.right = right;
  }
  accept<T>(visitor: Visitor<T>): unknown {
    return visitor.visitUnaryOperation(this);
  }
}

export class BinaryOperation extends Operation {
  constructor(
    public operator: Operator,
    public left: AstNode,
    public right: AstNode
  ) {
    super(operator);
    this.left = left;
    this.right = right;
  }
  accept<T>(visitor: Visitor<T>): unknown {
    return visitor.visitBinaryOperation(this);
  }
}

/* Logical Operations */

export class Not extends UnaryOperation {
  constructor(public right: Condition | Comparison) {
    super('not', right);
  }
}

export class And extends BinaryOperation {
  constructor(
    public left: Condition | Comparison,
    public right: Condition | Comparison
  ) {
    super('and', left, right);
  }
}

export class Or extends BinaryOperation {
  constructor(
    public left: Condition | Comparison,
    public right: Condition | Comparison
  ) {
    super('or', left, right);
  }
}

/* Comparisons */

export class Equals extends BinaryOperation {
  constructor(public left: Variable, public right: Comparable) {
    super('eq', left, right);
  }
}

export class NotEquals extends BinaryOperation {
  constructor(public left: Variable, public right: Comparable) {
    super('neq', left, right);
  }
}

export class LessThan extends BinaryOperation {
  constructor(public left: Variable, public right: Orderable) {
    super('lt', left, right);
  }
}

export class LessThanEquals extends BinaryOperation {
  constructor(public left: Variable, public right: Orderable) {
    super('lte', left, right);
  }
}

export class GreaterThan extends BinaryOperation {
  constructor(public left: Variable, public right: Orderable) {
    super('gt', left, right);
  }
}

export class GreaterThanEquals extends BinaryOperation {
  constructor(public left: Variable, public right: Orderable) {
    super('gte', left, right);
  }
}

export class Like extends BinaryOperation {
  constructor(public left: Variable, public right: Likeable) {
    super('like', left, right);
  }
}

export class Is extends BinaryOperation {
  constructor(public left: Variable, public right: Isable) {
    super('is', left, right);
  }
}

export class IsNot extends BinaryOperation {
  constructor(public left: Variable, public right: Isable) {
    super('is_not', left, right);
  }
}

export class In extends BinaryOperation {
  constructor(public left: Variable, public right: Inable) {
    super('in', left, right);
  }
}

export class NotIn extends BinaryOperation {
  constructor(public left: Variable, public right: Inable) {
    super('not_in', left, right);
  }
}
