import type { Visitor } from '../visitor';

export abstract class AstNode {

    abstract accept<T>(v: Visitor<T>): unknown;

}

export default AstNode;