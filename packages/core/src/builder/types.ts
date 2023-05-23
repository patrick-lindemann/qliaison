import { Comparison, Condition, Function, Value, Variable } from '../ast';

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

export type Comparable = null | boolean | number | string | Date | Function;
export type Orderable = number | Date | Function;
export type Likeable = string | Function;
export type Inable = (Literal | Function)[];
