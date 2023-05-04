import {
  And,
  Array,
  AstNode,
  BinaryOperation,
  BooleanValue,
  Comparison,
  Condition,
  DateValue,
  Equals,
  Function,
  GreaterThan,
  GreaterThanEquals,
  In,
  LessThan,
  LessThanEquals,
  Like,
  Not,
  NotEquals,
  NotIn,
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

export type Expression = Condition | Comparison;
export type Any =
  | Comparison
  | Condition
  | Function
  | Variable
  | Array<Function | Value>
  | Value;

export type Literal = null | boolean | number | string | Date;
export type Parameter = Literal | Variable | Function;

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

  function(identifier: string, parameters: AstNode[]): Function {
    return new Function(identifier, parameters);
  }

  variable(identifier: string): Variable {
    return new Variable(identifier);
  }

  array(items: AstNode[]): Array<AstNode> {
    return new Array(items);
  }

  value(type: Type, value: any): Value {
    return new Value(type, value);
  }
}

export class Builder {
  root(expr: Expression): Root {
    return new Root(expr);
  }

  not(expr: Expression): Condition {
    return new Not(expr);
  }

  and(left: Expression, right: Expression): Condition;
  and(cond1: Expression, cond2: Expression, ...conds: Expression[]): Condition;
  and(cond1: Expression, cond2: Expression, ...conds: Expression[]): Condition {
    return conds.reduce(
      (acc, item) => new And(acc, item),
      new And(cond1, cond2)
    ) as Condition;
  }

  or(left: Expression, right: Expression): Condition;
  or(cond1: Expression, cond2: Expression, ...conds: Expression[]): Condition;
  or(cond1: Expression, cond2: Expression, ...conds: Expression[]): Condition {
    return conds.reduce(
      (acc, item) => new Or(acc, item),
      new Or(cond1, cond2)
    ) as Condition;
  }

  eq(identifier: string, value: Literal | Function): Comparison {
    return new Equals(this.variable(identifier), this.value(value));
  }

  neq(identifier: string, value: Literal | Function): Comparison {
    return new NotEquals(this.variable(identifier), this.value(value));
  }

  lt(identifier: string, value: Literal | Function): Comparison {
    return new LessThan(this.variable(identifier), this.value(value));
  }

  lte(identifier: string, value: Literal | Function): Comparison {
    return new LessThanEquals(this.variable(identifier), this.value(value));
  }

  gt(identifier: string, value: Literal | Function): Comparison {
    return new GreaterThan(this.variable(identifier), this.value(value));
  }

  gte(identifier: string, value: Literal | Function): Comparison {
    return new GreaterThanEquals(this.variable(identifier), this.value(value));
  }

  like(identifier: string, value: Literal | Function): Comparison {
    return new Like(
      this.variable(identifier),
      value instanceof Function ? value : this.value(value)
    );
  }

  in(identifier: string, array: (Literal | Function)[]): Comparison {
    return new In(this.variable(identifier), this.array(array));
  }

  notIn(identifier: string, array: (Literal | Function)[]): Comparison {
    return new NotIn(this.variable(identifier), this.array(array));
  }

  function(identifier: string, ...parameters: Parameter[]): Function {
    const mappedParams = parameters.map((param) => this.parameter(param));
    return new Function(identifier, mappedParams);
  }

  variable(identifier: string): Variable {
    if (keywords.includes(identifier)) {
      throw new Error(
        `The name "${identifier}" is a reserved keyword and cannot be used as a variable identifier.`
      );
    }
    return new Variable(identifier);
  }

  protected value(value: Literal | Function): Value | Function {
    return value instanceof Function ? value : this.literal(value);
  }

  protected parameter(param: Parameter): Value | Variable | Function {
    return param instanceof AstNode ? param : this.literal(param);
  }

  protected literal(value: Literal): Value {
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

  protected array(items: (Literal | Function)[]): Array<Value | Function> {
    const mappedItems = items.map((item) => this.value(item));
    return new Array(mappedItems);
  }
}
