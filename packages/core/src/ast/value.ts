import type { Visitor } from '@/visitor';
import { AstNode } from './node';

/* Types */

export type Type = (typeof types)[number];

/* Constants */

export const types = [
  'null',
  'boolean',
  'number',
  'string',
  'date',
  'empty'
] as const;

/* Classes */

export class Value extends AstNode {
  constructor(public type: Type, public value: any) {
    super();
    this.type = type;
    this.value = value;
  }
  accept<T>(visitor: Visitor<T>): unknown {
    return visitor.visitValue(this);
  }
}

export class NullValue extends Value {
  constructor() {
    super('null', null);
  }
}

export class BooleanValue extends Value {
  constructor(public value: boolean) {
    super('boolean', value);
  }
}

export class NumberValue extends Value {
  constructor(public value: number) {
    super('number', value);
  }
}

export class StringValue extends Value {
  constructor(public value: string) {
    super('string', value);
  }
}

export class DateValue extends Value {
  constructor(public value: Date) {
    super('date', value);
  }
}
