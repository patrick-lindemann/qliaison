import type { Visitor } from 'base/visitor';

/* Abstract Classes */

export abstract class AstNode {
  abstract accept<T>(visitor: Visitor<T>): unknown;
}
