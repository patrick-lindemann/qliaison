import { ArrayNode, AstNode, ValueNode } from 'core/ast';

/* Types */

export type Type = typeof types[number];

export type Value
    = Null
    | Boolean
    | Number
    | String;

/* Constants */

export const types = [
    'null',
    'boolean',
    'number',
    'string'
];

/* Classes */

// Primary Types

export class Null extends ValueNode {
    constructor() {
        super('null', null);
    }
}

export class Boolean extends ValueNode {
    constructor(value: boolean) {
        super('boolean', value);
    }
}

export class Number extends ValueNode {
    constructor(value: number) {
        super('number', value);
        this.value = value;
    }
}

export class String extends ValueNode {
    constructor(value: string) {
        super('string', value);
        this.value = value;
    }
}

// Arrays

export class Array extends ArrayNode {
    constructor(...items: AstNode[]) {
        super(...items);
    }
}