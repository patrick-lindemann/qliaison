import type {
  Array,
  AstNode,
  BinaryOperation,
  Function,
  Root,
  UnaryOperation,
  Value,
  Variable
} from '@/ast';

export abstract class Visitor<OutputType> {
  abstract visitRoot(root: Root): OutputType;
  abstract visitUnaryOperation(operation: UnaryOperation): unknown;
  abstract visitBinaryOperation(operation: BinaryOperation): unknown;
  abstract visitFunction(func: Function): unknown;
  abstract visitVariable(variable: Variable): unknown;
  abstract visitArray<T extends AstNode>(array: Array<T>): unknown;
  abstract visitValue(value: Value): unknown;
}
