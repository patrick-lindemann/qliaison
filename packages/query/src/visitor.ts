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

  visitRoot(node: Root): string {
    if (!node.child) {
      return '';
    }
    return node.child.accept(this) as string;
  }

  visitUnaryOperation(node: UnaryOperation): unknown {
    const operator = symbols[node.operator];
    const value = node.right.accept(this);
    const result = `${operator} ${value}`;
    return this.options.parantheses ? `(${result})` : result;
  }

  visitBinaryOperation(node: BinaryOperation): unknown {
    const operator = symbols[node.operator];
    const left = node.left.accept(this);
    const right = node.right.accept(this);
    const result = `${left} ${operator} ${right}`;
    return this.options.parantheses ? `(${result})` : result;
  }

  visitFunction(node: Function): unknown {
    const identifier = node.identifier;
    const parameters = node.parameters
      .map((param) => param.accept(this))
      .join(',' + (this.options.condesed ? '' : ' '));
    return `${identifier}(${parameters})`;
  }

  visitVariable(node: Variable): unknown {
    return node.identifier;
  }

  visitArray<T extends AstNode>(nodes: Array<T>): unknown {
    return (
      '[' +
      nodes.items
        .map((item) => item.accept(this))
        .join(',' + (this.options.condesed ? '' : ' ')) +
      ']'
    );
  }

  visitValue(node: Value): unknown {
    if (node.type == 'string') {
      return '"' + node.value + '"';
    }
    return String(node.value);
  }
}
