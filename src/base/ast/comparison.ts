import type { Array } from './array';
import type { AstNode } from './ast';
import { BinaryOperation } from './operation';
import type {
  EmptyValue,
  NullValue,
  NumberValue,
  StringValue,
  Value
} from './value';
import type { Variable } from './variable';

/* Types */

export type Comparator = (typeof comparators)[number];

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
    public comparator: Comparator,
    public left: AstNode,
    public right: AstNode
  ) {
    super(comparator, left, right);
  }
}

/* Classes */

export class Equals extends Comparison {
  constructor(public left: Variable, public right: Value) {
    super('eq', left, right);
  }
}

export class NotEquals extends Comparison {
  constructor(public left: Variable, public right: Value) {
    super('neq', left, right);
  }
}

export class LessThan extends Comparison {
  constructor(public left: Variable, public right: NumberValue) {
    super('lt', left, right);
  }
}

export class LessThanEquals extends Comparison {
  constructor(public left: Variable, public right: NumberValue) {
    super('lte', left, right);
  }
}

export class GreaterThan extends Comparison {
  constructor(public left: Variable, public right: NumberValue) {
    super('gt', left, right);
  }
}

export class GreaterThanEquals extends Comparison {
  constructor(public left: Variable, public right: NumberValue) {
    super('gte', left, right);
  }
}

export class Like extends Comparison {
  constructor(public left: Variable, public right: StringValue) {
    super('like', left, right);
  }
}

export class Is extends Comparison {
  constructor(public left: Variable, public right: NullValue | EmptyValue) {
    super('is', left, right);
  }
}

export class IsNot extends Comparison {
  constructor(public left: Variable, public right: NullValue | EmptyValue) {
    super('is_not', left, right);
  }
}

export class In extends Comparison {
  constructor(public left: Variable, public right: Array<Value>) {
    super('in', left, right);
  }
}

export class NotIn extends Comparison {
  constructor(public left: Variable, public right: Array<Value>) {
    super('not_in', left, right);
  }
}
