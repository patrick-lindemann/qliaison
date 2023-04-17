import type { Visitor } from '../visitor';
import { AstNode } from './ast';

export class RootNode extends AstNode {

    child?: AstNode;

    constructor(child?: AstNode) {
        super();
        this.child = child;
    }

    accept<T>(v: Visitor<T>): T {
        return v.visitRootNode(this);
    }

}

export default RootNode;