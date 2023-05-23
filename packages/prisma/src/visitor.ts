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

export class PrismaVisitor<T> extends Visitor<unknown> {
  visitRoot(root: Root): unknown {
    throw new Error('Method not implemented.');
  }
  visitUnaryOperation(operation: UnaryOperation): unknown {
    throw new Error('Method not implemented.');
  }
  visitBinaryOperation(operation: BinaryOperation): unknown {
    throw new Error('Method not implemented.');
  }
  visitFunction(func: Function): unknown {
    throw new Error('Method not implemented.');
  }
  visitVariable(variable: Variable): unknown {
    throw new Error('Method not implemented.');
  }
  visitArray<T extends AstNode>(array: Array<T>): unknown {
    throw new Error('Method not implemented.');
  }
  visitValue(value: Value): unknown {
    throw new Error('Method not implemented.');
  }
}
