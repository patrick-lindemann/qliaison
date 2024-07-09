import type {
  Array,
  AstNode,
  BinaryOperation,
  Function,
  Root,
  UnaryOperation,
  Value,
  Variable
} from '../ast';

export abstract class Visitor<OutputType> {
  abstract visitRoot(node: Root): OutputType;
  abstract visitUnaryOperation(node: UnaryOperation): unknown;
  abstract visitBinaryOperation(node: BinaryOperation): unknown;
  abstract visitFunction(node: Function): unknown;
  abstract visitVariable(node: Variable): unknown;
  abstract visitArray<T extends AstNode>(nodes: Array<T>): unknown;
  abstract visitValue(node: Value): unknown;
}
