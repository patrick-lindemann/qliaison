import {
  Array,
  AstNode,
  BinaryOperation,
  Function,
  Root,
  UnaryOperation,
  Value,
  Variable,
  symbols
} from 'base/ast';
import { Visitor } from 'base/visitor';

export class QueryStringSerializer extends Visitor<string> {
  visitRoot(root: Root): string {
    if (!root.child) {
      return '';
    }
    return root.child.accept(this) as string;
  }

  visitUnaryOperation(operation: UnaryOperation): unknown {
    const operator = symbols[operation.operator];
    const value = operation.value.accept(this);
    return `${operator} ${value}`;
  }

  visitBinaryOperation(operation: BinaryOperation): unknown {
    const operator = symbols[operation.operator];
    const left = operation.left.accept(this);
    const right = operation.right.accept(this);
    return `(${left} ${operator} ${right})`;
  }

  visitFunction(func: Function): unknown {
    const identifier = func.identifier;
    const parameters = func.parameters
      .map((param) => param.accept(this))
      .join(',');
    return `${identifier}(${parameters})`;
  }

  visitVariable(variable: Variable): unknown {
    return variable.identifier;
  }

  visitArray<T extends AstNode>(array: Array<T>): unknown {
    return '[' + array.items.map((item) => item.accept(this)) + ']';
  }

  visitValue(value: Value): unknown {
    if (value.type == 'string') {
      return '"' + value.value + '"';
    }
    return String(value.value);
  }
}
