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
  visitRoot(node: Root): unknown {
    throw new Error('Method not implemented.');
  }
  visitUnaryOperation(node: UnaryOperation): unknown {
    throw new Error('Method not implemented.');
  }
  visitBinaryOperation(node: BinaryOperation): unknown {
    throw new Error('Method not implemented.');
  }
  visitFunction(node: Function): unknown {
    throw new Error('Method not implemented.');
  }
  visitVariable(node: Variable): unknown {
    throw new Error('Method not implemented.');
  }
  visitArray<T extends AstNode>(nodes: Array<T>): unknown {
    throw new Error('Method not implemented.');
  }
  visitValue(nodee: Value): unknown {
    throw new Error('Method not implemented.');
  }
}
