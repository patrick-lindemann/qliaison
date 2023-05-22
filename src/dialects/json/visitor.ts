import {
  Array,
  AstNode,
  BinaryOperation,
  Function,
  Root,
  UnaryOperation,
  Value,
  Variable
} from '@base/ast';
import { Visitor } from '@base/visitor';
import { Node } from './types';

export class JsonVisitor extends Visitor<object> {
  visitRoot(root: Root): object {
    if (!root.child) {
      return {};
    }
    return root.child.accept(this) as object;
  }

  visitUnaryOperation(operation: UnaryOperation): Node<UnaryOperation> {
    return { nodeType: 'unaryOperation', ...operation };
  }

  visitBinaryOperation(operation: BinaryOperation): Node<BinaryOperation> {
    return { nodeType: 'binaryOperation', ...operation };
  }

  visitFunction(func: Function): Node<Function> {
    return { nodeType: 'function', ...func };
  }

  visitVariable(variable: Variable): Node<Variable> {
    return { nodeType: 'variable', ...variable };
  }

  visitArray<T extends AstNode>(array: Array<T>): Node<Array<T>> {
    return { nodeType: 'array', ...array };
  }

  visitValue(value: Value): Node<Value> {
    return { nodeType: 'value', ...value };
  }
}
