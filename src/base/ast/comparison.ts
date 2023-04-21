import type { Array } from './array';
import type { AstNode } from './ast';
import { BinaryOperation } from './operation';
import type {
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

export type Comparator = (typeof comparators)[number];

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

export abstract class Comparison extends BinaryOperation {
  constructor(
    public operator: Comparator,
    public left: AstNode,
    public right: AstNode
  ) {
    super(operator, left, right);
  }
}

/* Classes */

export class Equals extends Comparison {
  constructor(public left: Variable, public right: Comparable) {
    super('eq', left, right);
  }
}

export class NotEquals extends Comparison {
  constructor(public left: Variable, public right: Comparable) {
    super('neq', left, right);
  }
}

export class LessThan extends Comparison {
  constructor(public left: Variable, public right: Orderable) {
    super('lt', left, right);
  }
}

export class LessThanEquals extends Comparison {
  constructor(public left: Variable, public right: Orderable) {
    super('lte', left, right);
  }
}

export class GreaterThan extends Comparison {
  constructor(public left: Variable, public right: Orderable) {
    super('gt', left, right);
  }
}

export class GreaterThanEquals extends Comparison {
  constructor(public left: Variable, public right: Orderable) {
    super('gte', left, right);
  }
}

export class Like extends Comparison {
  constructor(public left: Variable, public right: Likeable) {
    super('like', left, right);
  }
}

export class Is extends Comparison {
  constructor(public left: Variable, public right: Isable) {
    super('is', left, right);
  }
}

export class IsNot extends Comparison {
  constructor(public left: Variable, public right: Isable) {
    super('is_not', left, right);
  }
}

export class In extends Comparison {
  constructor(public left: Variable, public right: Inable) {
    super('in', left, right);
  }
}

export class NotIn extends Comparison {
  constructor(public left: Variable, public right: Inable) {
    super('not_in', left, right);
  }
}
