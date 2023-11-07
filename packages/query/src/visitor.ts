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
import { symbols } from './grammar';

export interface QueryVisitorOptions {
  /**
   * Whether to wrap operations in parantheses or not.
   *
   * Example (parantheses = false):
   *  `a = 1 AND b = 2 OR c = 3;`
   *
   * Example: (parantheses = true):
   *  `((a = 1 AND b = 2) OR c = 3);`
   *
   */
  parantheses?: boolean;

  /**
   * Whether to add whitespaces to listings for better readability or not.
   *
   * Example (condensed = false):
   * `a = func(1, false) or b in ['admin', 'user', 'guest']`
   *
   * Example (condesed = true):
   * `a = func(1,false) or b in ['admin','user','guest']`
   *
   */
  condesed?: boolean;
}

export class QueryVisitor extends Visitor<string> {
  options: QueryVisitorOptions;

  constructor(options: QueryVisitorOptions = {}) {
    super();
    this.options = options;
  }

  visitRoot(root: Root): string {
    if (!root.child) {
      return '';
    }
    return root.child.accept(this) as string;
  }

  visitUnaryOperation(operation: UnaryOperation): unknown {
    const operator = symbols[operation.operator];
    const value = operation.right.accept(this);
    const result = `${operator} ${value}`;
    return this.options.parantheses ? `(${result})` : result;
  }

  visitBinaryOperation(operation: BinaryOperation): unknown {
    const operator = symbols[operation.operator];
    const left = operation.left.accept(this);
    const right = operation.right.accept(this);
    const result = `${left} ${operator} ${right}`;
    return this.options.parantheses ? `(${result})` : result;
  }

  visitFunction(func: Function): unknown {
    const identifier = func.identifier;
    const parameters = func.parameters
      .map((param) => param.accept(this))
      .join(',' + (this.options.condesed ? '' : ' '));
    return `${identifier}(${parameters})`;
  }

  visitVariable(variable: Variable): unknown {
    return variable.identifier;
  }

  visitArray<T extends AstNode>(array: Array<T>): unknown {
    return (
      '[' +
      array.items
        .map((item) => item.accept(this))
        .join(',' + (this.options.condesed ? '' : ' ')) +
      ']'
    );
  }

  visitValue(value: Value): unknown {
    if (value.type == 'string') {
      return '"' + value.value + '"';
    }
    return String(value.value);
  }
}
