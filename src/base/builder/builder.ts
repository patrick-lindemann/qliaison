import {
  And,
  Array,
  AstNode,
  BinaryOperation,
  BooleanValue,
  Comparison,
  Condition,
  DateValue,
  EmptyValue,
  Equals,
  Function,
  GreaterThan,
  In,
  Is,
  LessThan,
  LessThanEquals,
  Like,
  Not,
  NotEquals,
  NotIn,
  NotIs,
  NullValue,
  NumberValue,
  Operator,
  Or,
  Root,
  StringValue,
  Type,
  UnaryOperation,
  Value,
  Variable
} from 'base/ast';
import { keywords } from 'base/keywords';

/* Types */

export type Any =
  | Comparison
  | Condition
  | Function
  | Variable
  | Array<Value>
  | Value;
export type Literal = null | boolean | number | string | Date;

/* Classes */

export class LowLevelBuilder {
  root(child: AstNode): Root {
    return new Root(child);
  }

  unaryOperation(operator: Operator, right: AstNode): UnaryOperation {
    return new UnaryOperation(operator, right);
  }

  binaryOperation(
    operator: Operator,
    left: AstNode,
    right: AstNode
  ): BinaryOperation {
    return new BinaryOperation(operator, left, right);
  }

  function(identifier: string, ...parameters: AstNode[]): Function {
    return new Function(identifier, parameters);
  }

  variable(identifier: string): Variable {
    return new Variable(identifier);
  }

  array(...items: AstNode[]): Array<AstNode> {
    return new Array(items);
  }

  value(type: Type, value: any): Value {
    return new Value(type, value);
  }
}

export class Builder {
  root(expr: Condition | Comparison): Root {
    return new Root(expr);
  }

  not(expr: Condition | Comparison): Condition {
    return new Not(expr);
  }

  and(left: Condition | Comparison, right: Condition | Comparison): Condition;
  and(
    cond1: Condition | Comparison,
    cond2: Condition | Comparison,
    ...conditions: (Condition | Comparison)[]
  ): Condition;
  and(
    cond1: Condition | Comparison,
    cond2: Condition | Comparison,
    ...conditions: (Condition | Comparison)[]
  ): Condition {
    return conditions.reduce(
      (acc, item) => new And(acc, item),
      new And(cond1, cond2)
    ) as Condition;
  }

  or(left: Condition | Comparison, right: Condition | Comparison): Condition;
  or(
    cond1: Condition | Comparison,
    cond2: Condition | Comparison,
    ...conditions: (Condition | Comparison)[]
  ): Condition;
  or(
    cond1: Condition | Comparison,
    cond2: Condition | Comparison,
    ...conditions: (Condition | Comparison)[]
  ): Condition {
    return conditions.reduce(
      (acc, item) => new Or(acc, item),
      new Or(cond1, cond2)
    ) as Condition;
  }

  eq(identifier: string, value: Literal): Comparison {
    return new Equals(this.variable(identifier), this.value(value));
  }

  neq(identifier: string, value: Literal): Comparison {
    return new NotEquals(this.variable(identifier), this.value(value));
  }

  lt(identifier: string, value: Literal): Comparison {
    return new LessThan(this.variable(identifier), this.value(value));
  }

  lte(identifier: string, value: Literal): Comparison {
    return new LessThanEquals(this.variable(identifier), this.value(value));
  }

  gt(identifier: string, value: Literal): Comparison {
    return new GreaterThan(this.variable(identifier), this.value(value));
  }

  like(identifier: string, value: Literal): Comparison {
    return new Like(this.variable(identifier), this.value(value));
  }

  is(identifier: string, value: 'null' | 'empty'): Comparison {
    return new Is(
      this.variable(identifier),
      value == 'null' ? new NullValue() : new EmptyValue()
    );
  }

  isNot(identifier: string, value: 'null' | 'empty'): Comparison {
    return new NotIs(
      this.variable(identifier),
      value == 'null' ? new NullValue() : new EmptyValue()
    );
  }

  in(identifier: string, array: Literal[]): Comparison {
    return new In(this.variable(identifier), this.array(array));
  }

  notIn(identifier: string, array: Literal[]): Comparison {
    return new NotIn(this.variable(identifier), this.array(array));
  }

  function(
    identifier: string,
    ...parameters: (Literal | Variable)[]
  ): Function {
    const paramNodes = parameters.map((param) =>
      param instanceof Variable ? param : this.value(param)
    );
    return new Function(identifier, paramNodes);
  }

  variable(identifier: string): Variable {
    if (keywords.includes(identifier)) {
      throw new Error(
        `The name "${identifier}" is a reserved keyword and cannot be used as a variable identifier.`
      );
    }
    return new Variable(identifier);
  }

  protected array(items: Literal[]): Array<Value> {
    const mappedItems = items.map((item) => this.value(item));
    return new Array(mappedItems);
  }

  protected value(value: Literal): Value {
    if (value === null) {
      return new NullValue();
    }
    switch (typeof value) {
      case 'boolean':
        return new BooleanValue(value);
      case 'number':
        return new NumberValue(value);
      case 'string':
        return new StringValue(value);
    }
    if (value instanceof Date) {
      return new DateValue(value);
    }
  }
}
