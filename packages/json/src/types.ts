import { AstNode } from '@qliaison/core';

/**
 * Extract property keys from T that are not a method
 */
export type NonMethodKeys<T> = {
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

/**
 * Extract the attributes from T
 */
export type Attributes<T> = Pick<T, NonMethodKeys<T>>;

/**
 * The supported low-level node types
 */
export type NodeType =
  | 'unaryOperation'
  | 'binaryOperation'
  | 'function'
  | 'array'
  | 'variable'
  | 'value';

/**
 * A JSON node, which consists of a NodeType and the attributes of the
 * according low-level node.
 */
export type Node<T extends AstNode> = Attributes<T> & {
  nodeType: NodeType;
};
