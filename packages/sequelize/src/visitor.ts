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
import { WhereOptions, col, fn, where } from '@sequelize/core';
import { symbols } from './symbols';

export class SequelizeVisitor<T> extends Visitor<WhereOptions<T>> {
  visitRoot(node: Root): WhereOptions<T> {
    if (!node.child) {
      return {};
    }
    return node.child.accept(this) as WhereOptions<T>;
  }

  visitUnaryOperation(node: UnaryOperation): unknown {
    const right = node.right.accept(this);
    const symbol = symbols[node.operator] as symbol;
    return { [symbol]: [right] };
  }

  visitBinaryOperation(node: BinaryOperation): unknown {
    const left = node.left.accept(this);
    const right = node.right.accept(this);
    const operator = symbols[node.operator];
    if (!operator) {
      throw new Error(
        `Sequelize symbol for operator "${node.operator}" not found.`
      );
    }
    if (['and', 'or'].includes(node.operator)) {
      return { [operator as symbol]: [left, right] };
    }
    if (node.left instanceof Function) {
      return where(left, { [operator]: right });
    }
    return { [left as string]: { [operator]: right } };
  }

  visitFunction(func: Function): unknown {
    const parameters = func.parameters.map((param) => {
      const value = param.accept(this);
      if (param instanceof Variable) {
        // identifiers need to be wrapped with sequelize.col
        return col(value as string);
      }
      return value;
    });
    return fn(func.identifier, ...parameters);
  }

  visitVariable(node: Variable): unknown {
    return node.identifier;
  }

  visitArray<T extends AstNode>(nodes: Array<T>): unknown {
    return nodes.items.map((node) => node.accept(this));
  }

  visitValue(node: Value): unknown {
    return node.value;
  }
}
