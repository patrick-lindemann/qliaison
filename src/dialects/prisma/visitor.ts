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
import { WhereOptions } from '@sequelize/core';

export class PrismaVisitor<T> extends Visitor<WhereOptions<T>> {
  visitRoot(root: Root): WhereOptions<T> {
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
