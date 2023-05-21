import type {
  Array as ArrayNode,
  AstNode,
  BinaryOperation as BinaryOperationNode,
  Function as FunctionNode,
  Operator,
  Root as RootNode,
  UnaryOperation as UnaryOperationNode,
  Value as ValueNode,
  Variable as VariableNode
} from '@base/ast';
import { LowLevelBuilder } from '@base/builder';
import { keywords } from '@base/keywords';

/* Types */

export type Reject = {};
export type PostProcessor<T> = (
  d: any[],
  loc?: number,
  reject?: Reject
) => T | Reject;
export type AstPostProcessor<T extends AstNode> = PostProcessor<T>;

/* Constants */

const builder = new LowLevelBuilder();

/* Functions */

// Root

export const root: AstPostProcessor<RootNode> = (d) => {
  const root = d[1];
  return builder.root(root || undefined);
};

// Operations

export const operator: (type: Operator) => PostProcessor<Operator> = (type) => {
  return () => type;
};

export const unaryOperation: AstPostProcessor<UnaryOperationNode> = (d) => {
  const [$operator, right] = [d[0], d[2]];
  return builder.unaryOperation($operator, right);
};

export const binaryOperation: AstPostProcessor<BinaryOperationNode> = (d) => {
  const [left, $operator, right] = [d[0], d[2], d[4]];
  return builder.binaryOperation($operator, left, right);
};

// Variables & Functions

export const selector: AstPostProcessor<VariableNode> = (d) => {
  const selector = d[0];
  return builder.variable(selector);
};

export const fn: AstPostProcessor<FunctionNode> = (d) => {
  const [identifier, parameters] = [d[0], d[4]];
  return builder.function(identifier, parameters);
};

export const identifier: PostProcessor<string> = (d, _, reject) => {
  const identifier = d[0] + d[1].join('');
  if (keywords.includes(identifier.toLowerCase())) {
    // Matched a keyword, which cannot be used as identifier
    return reject;
  }
  return identifier;
};

// Arrays

export const array: AstPostProcessor<ArrayNode<ValueNode>> = (d) => {
  const items = d[2];
  return builder.array(items);
};

export const listing: PostProcessor<any[]> = (d) => {
  const [value, list] = [d[0], d[4]];
  // Case with 0 elements or 1 element is caught by the grammar
  if (!Array.isArray(list)) {
    // Listings contains 2 elements
    return [value, list];
  } else {
    // Listing contains >= 3 elements
    return [value, ...list];
  }
};

// Values

export const nul: PostProcessor<ValueNode> = () => {
  return builder.value('null', null);
};

export const boolean: PostProcessor<boolean> = (d) => {
  return builder.value('boolean', d[0].toLowerCase() === 'true');
};

export const integer: PostProcessor<number> = (d) => {
  const str = (d[0] ? d[0][0] : '') + d[1].join('');
  return builder.value('number', parseInt(str));
};

export const float: PostProcessor<number> = (d) => {
  const str = (d[0] ? d[0][0] : '') + d[1].join('') + '.' + d[3].join('');
  return builder.value('number', parseFloat(str));
};

export const string: PostProcessor<string> = (d) => {
  return builder.value('string', d[0]);
};

// Helpers

export const join: PostProcessor<string> = (d) => {
  return d.join('');
};

export function nth(index: number): PostProcessor<any> {
  return function (d) {
    return d[index];
  };
}

export function select(...index: number[]): PostProcessor<any[]> {
  return function (d) {
    return index.map((index) => d[index]);
  };
}
