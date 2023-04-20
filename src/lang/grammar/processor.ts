import type { ArrayNode, AstNode, FunctionNode, InfixOperationNode, PostfixOperationNode, PrefixOperationNode, RootNode, ValueNode, VariableNode } from 'core/ast';
import { Builder } from 'core/builder';
import { Operator, Type, keywords } from 'lang/defs';

/* Types */

export type Reject = {};
export type PostProcessor<T> = (d: any[], loc?: number, reject?: Reject) => T | Reject;
export type AstPostProcessor<T extends AstNode> = PostProcessor<T>;

/* Constants */

const builder = new Builder();

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

export const prefixOperation: AstPostProcessor<PrefixOperationNode> = (d) => {
    const [$operator, right] = [d[0], d[2]];
    return builder.prefixOperation($operator, right);
};

export const infixOperation: AstPostProcessor<InfixOperationNode> = (d) => {
    const [left, $operator, right] = [d[0], d[2], d[4]];
    return builder.infixOperation($operator, left, right);
};

export const postfixOperation: AstPostProcessor<PostfixOperationNode> = (d) => {
    const [left, $operator] = [d[0], d[2]];
    return builder.postfixOperation($operator, left);
};

export const isOperation: AstPostProcessor<PostfixOperationNode> = (d) => {
    const [left, $is, $not, right] = [d[0], d[2], d[4], d[5][0]];
    const operator = $is + '_' + ($not ? $not + '_' : '') + right.toLowerCase();
    return builder.postfixOperation(operator, left);
};

export const inOperation: AstPostProcessor<InfixOperationNode> = (d) => {
    const [left, $not, $in, right] = [d[0], d[2], d[3], d[5]];
    const operator = ($not ? $not + '_' : '') + $in;
    return builder.infixOperation(operator, left, right);
};

// Variables & Functions

export const selector: AstPostProcessor<VariableNode> = (d) => {
    const selector = d[0];
    return builder.variable(selector);
};

export const func: AstPostProcessor<FunctionNode> = (d) => {
    const [identifier, parameters] = [d[0], d[4]];
    return builder.function(identifier, ...parameters);
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

export const array: AstPostProcessor<ArrayNode> = (d) => {
    const items = d[2] || [];
    return builder.array(...items);
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

export const value: (type: Type) => AstPostProcessor<ValueNode> = (type) => {
    return (d) => builder.value(type, d[0]);
};

export const boolean: PostProcessor<boolean> = (d) => {
    return d[0].toLowerCase() === 'true';
};

export const integer: PostProcessor<number> = (d) => {
    const str = (d[0] ? d[0][0] : '') + d[1].join('');
    return parseInt(str);
};

export const float: PostProcessor<number> = (d) => {
    const str = (d[0] ? d[0][0] : '') + d[1].join('') + '.' + d[3].join('');
    return parseFloat(str);
};

export const string: PostProcessor<string> = (d) => {
    return d[0];
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