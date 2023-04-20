import type { Array as ArrayNode, AstNode, BinaryOperation, Comparator, ConditionOperator, Function, Root, UnaryOperation, Value, Variable } from 'core/ast';
import { keywords } from 'core/ast';
import { Builder } from 'core/builder';

/* Types */

export type Reject = {};
export type PostProcessor<T> = (d: any[], loc?: number, reject?: Reject) => T | Reject;
export type AstPostProcessor<T extends AstNode> = PostProcessor<T>;

/* Constants */

const builder = new Builder();

/* Functions */

// Root

export const root: AstPostProcessor<Root> = (d) => {
    const root = d[1];
    return builder.root(root || undefined);
};

// Operations

export const operator: (type: ConditionOperator | Comparator) => PostProcessor<ConditionOperator | Comparator> = (type) => {
    return () => type;
};

export const unaryOperation: AstPostProcessor<UnaryOperation> = (d) => {
    const [$operator, right] = [d[0], d[2]];
    return builder._unaryOperation($operator, right);
};

export const binaryOperation: AstPostProcessor<BinaryOperation> = (d) => {
    const [left, $operator, right] = [d[0], d[2], d[4]];
    return builder._binaryOperation($operator, left, right);
};

export const isOperation: AstPostProcessor<BinaryOperation> = (d) => {
    const [left, $is, $not, right] = [d[0], d[2], d[4], d[5][0]];
    const operator = $is + '_' + ($not ? $not : '');
    return builder._binaryOperation(operator, left, right.toLowerCase());
};

export const inOperation: AstPostProcessor<BinaryOperation> = (d) => {
    const [left, $not, $in, right] = [d[0], d[2], d[3], d[5]];
    const operator = ($not ? $not + '_' : '') + $in;
    return builder._binaryOperation(operator, left, right);
};

// Variables & Functions

export const selector: AstPostProcessor<Variable> = (d) => {
    const selector = d[0];
    return builder.variable(selector);
};

export const func: AstPostProcessor<Function> = (d) => {
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

export const array: AstPostProcessor<ArrayNode> = (d) => {
    const items = d[2] || [];
    return builder._array(items);
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

export const value: () => AstPostProcessor<Value> = () => {
    return (d) => builder._value(d[0]);
};

export const _null: PostProcessor<null> = () => {
    return null;
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