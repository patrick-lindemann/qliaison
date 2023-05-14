import {
  Array,
  AstNode,
  BinaryOperation,
  Function,
  Root,
  UnaryOperation,
  Value,
  Variable
} from 'base/ast';
import { Visitor } from 'base/visitor';

export class JsonVisitor extends Visitor<object> {
  visitRoot(root: Root): object {
    if (!root.child) {
      return {};
    }
    return root.child.accept(this) as object;
  }

  visitUnaryOperation(operation: UnaryOperation): unknown {
    return { type: 'unaryOperation', ...operation };
  }

  visitBinaryOperation(operation: BinaryOperation): unknown {
    return { type: 'binaryOperation', ...operation };
  }

  visitFunction(func: Function): unknown {
    return { type: 'function', ...func };
  }

  visitVariable(variable: Variable): unknown {
    return { type: 'variable', ...variable };
  }

  visitArray<T extends AstNode>(array: Array<T>): unknown {
    return { type: 'array', ...array };
  }

  visitValue(value: Value): unknown {
    return { type: 'value', ...value };
  }
}
