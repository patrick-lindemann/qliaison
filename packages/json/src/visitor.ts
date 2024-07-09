import {
  Array,
  AstNode,
  BinaryOperation,
  Function,
  Root,
  UnaryOperation,
  Value,
  Variable,
  Visitor
} from '@qliaison/core';
import { Node } from './types';

export class JsonVisitor extends Visitor<object> {
  visitRoot(node: Root): object {
    if (!node.child) {
      return {};
    }
    return node.child.accept(this) as object;
  }

  visitUnaryOperation(node: UnaryOperation): Node<UnaryOperation> {
    return { nodeType: 'unaryOperation', ...node };
  }

  visitBinaryOperation(node: BinaryOperation): Node<BinaryOperation> {
    return { nodeType: 'binaryOperation', ...node };
  }

  visitFunction(node: Function): Node<Function> {
    return { nodeType: 'function', ...node };
  }

  visitVariable(node: Variable): Node<Variable> {
    return { nodeType: 'variable', ...node };
  }

  visitArray<T extends AstNode>(node: Array<T>): Node<Array<T>> {
    return { nodeType: 'array', ...node };
  }

  visitValue(node: Value): Node<Value> {
    return { nodeType: 'value', ...node };
  }
}
