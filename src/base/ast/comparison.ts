import type { Array } from './array';
import type { AstNode } from './ast';
import { BinaryOperation } from './operation';
import type { Empty, Null, Number, String, Value } from './value';
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
  constructor(public left: Variable, public right: Number) {
    super('lt', left, right);
  }
}

export class LessThanEquals extends Comparison {
  constructor(public left: Variable, public right: Number) {
    super('lte', left, right);
  }
}

export class GreaterThan extends Comparison {
  constructor(public left: Variable, public right: Number) {
    super('gt', left, right);
  }
}

export class GreaterThanEquals extends Comparison {
  constructor(public left: Variable, public right: Number) {
    super('gte', left, right);
  }
}

export class Like extends Comparison {
  constructor(public left: Variable, public right: String) {
    super('like', left, right);
  }
}

export class Is extends Comparison {
  constructor(public left: Variable, public right: Null | Empty) {
    super('is', left, right);
  }
}

export class IsNot extends Comparison {
  constructor(public left: Variable, public right: Null | Empty) {
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
