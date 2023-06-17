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
import {
  WhereLeftOperand,
  WhereOptions,
  col,
  fn,
  where
} from '@sequelize/core';
import { symbols } from './symbols';

export class SequelizeVisitor<T> extends Visitor<WhereOptions<T>> {
  visitRoot(root: Root): WhereOptions<T> {
    if (!root.child) {
      return {};
    }
    return root.child.accept(this) as WhereOptions<T>;
  }

  visitUnaryOperation(operation: UnaryOperation): unknown {
    const right = operation.right.accept(this);
    const symbol = symbols[operation.operator] as symbol;
    return { [symbol]: [right] };
  }

  visitBinaryOperation(operation: BinaryOperation): unknown {
    const left = operation.left.accept(this);
    const right = operation.right.accept(this);
    const operator = symbols[operation.operator];
    if (!operator) {
      throw new Error(
        `Sequelize symbol for operator "${operation.operator}" not found.`
      );
    }
    if (['and', 'or'].includes(operation.operator)) {
      return { [operator as symbol]: [left, right] };
    }
    if (operation.left instanceof Function) {
      return where(left as WhereLeftOperand, { [operator]: right });
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

  visitVariable(variable: Variable): unknown {
    return variable.identifier;
  }

  visitArray<T extends AstNode>(array: Array<T>): unknown {
    return array.items.map((item) => item.accept(this));
  }

  visitValue(value: Value): unknown {
    return value.value;
  }
}
