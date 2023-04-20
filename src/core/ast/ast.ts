import type { Visitor } from 'core/visitor';

/* Abstract Classes */

export abstract class AstNode {
    abstract accept<T>(visitor: Visitor<T>): unknown;
}

export default AstNode;