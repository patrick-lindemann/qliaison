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

/* Classes */

export class Builder {
  root(child: AstNode): Root {
    return new Root(child);
  }

  unaryOperation(operator: string, right: AstNode): UnaryOperation {
    return new UnaryOperation(operator, right);
  }

  binaryOperation(
    operator: string,
    left: AstNode,
    right: AstNode
  ): BinaryOperation {
    return new BinaryOperation(operator, left, right);
  }

  function(identifier: string, ...parameters: AstNode[]): Function {
    return new Function(identifier, parameters);
  }

  variable(identifier: string): Variable {
    return new Variable(identifier);
  }

  array(...items: AstNode[]): Array<AstNode> {
    return new Array(items);
  }

  value(type: string, value: AstNode): Value {
    return new Value(type, value);
  }
}
