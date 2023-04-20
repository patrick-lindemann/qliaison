import { Mixin } from 'ts-mixer';
import type { Comparison } from './comparison';
import { BinaryOperation, Operation, UnaryOperation } from './operation';

/* Types */

export type ConditionOperator = typeof conditionOperators[number];

/* Constants */

export const conditionOperators = [
    'and',
    'or'
];

/* Abstract Classes */

export abstract class Condition extends Operation {
    constructor(public operator: ConditionOperator) {
        super(operator);
    }
}

/* Classes */

export class Not extends Mixin(Condition, UnaryOperation) {
    constructor(public value: Condition | Comparison) {
        super('not', value);
    }
}

export class And extends Mixin(Condition, BinaryOperation) {
    constructor(public left: Condition | Comparison, public right: Condition | Comparison) {
        super('and', left, right);
    }
}

export class Or extends Mixin(Condition, BinaryOperation) {
    constructor(public left: Condition | Comparison, public right: Condition | Comparison) {
        super('or', left, right);
    }
}