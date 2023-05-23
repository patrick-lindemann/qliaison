import type { Visitor } from '../visitor';

/* Abstract Classes */

export abstract class AstNode {
  abstract accept<T>(visitor: Visitor<T>): unknown;
}
