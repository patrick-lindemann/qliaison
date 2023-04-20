import { RootNode } from 'core/ast';
import { Comparison, Condition } from './operations';

export class ParseTree extends RootNode {
    constructor(child?: Condition | Comparison) {
        super(child);
    }
}