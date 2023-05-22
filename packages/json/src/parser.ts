import { Node } from '@/types';
import {
  Array,
  AstNode,
  BinaryOperation,
  Function,
  Root,
  UnaryOperation,
  Value,
  Variable
} from '@qliaison/core/ast';
import { Parser } from '@qliaison/core/parser';
import { ParseTree } from '@qliaison/core/types';
import isEmpty from 'lodash.isempty';

/* Classes */

export class JsonParser extends Parser<object> {
  parse(input: object): ParseTree {
    if (isEmpty(input)) {
      return new Root();
    }
    const child = this.node(input as Node<AstNode>);
    return new Root(child);
  }

  protected node<T extends AstNode>(obj: Node<T>): AstNode {
    switch (obj.nodeType) {
      case 'unaryOperation': {
        const { operator, right } = obj as unknown as Node<UnaryOperation>;
        return new UnaryOperation(operator, right);
      }
      case 'binaryOperation': {
        const { left, operator, right } =
          obj as unknown as Node<BinaryOperation>;
        return new BinaryOperation(operator, left, right);
      }
      case 'function': {
        const { identifier, parameters } = obj as unknown as Node<Function>;
        return new Function(identifier, parameters);
      }
      case 'variable': {
        const { identifier } = obj as unknown as Node<Variable>;
        return new Variable(identifier);
      }
      case 'array': {
        const { items } = obj as unknown as Node<Array<Value>>;
        return new Array(items);
      }
      case 'value': {
        const { type, value } = obj as unknown as Node<Value>;
        return new Value(type, value);
      }
    }
  }
}
