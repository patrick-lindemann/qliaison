import type { Visitor } from 'base/visitor';
import { AstNode } from './ast';
import { Comparable, Isable, Likeable, Orderable } from './comparison';

/* Types */

export type Type = (typeof types)[number];

/* Constants */

export const types = [
  'null',
  'empty',
  'boolean',
  'number',
  'string',
  'date'
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

export class NullValue extends Value implements Comparable, Isable {
  constructor() {
    super('null', null);
  }
}

export class EmptyValue extends Value implements Isable {
  constructor() {
    super('empty', '');
  }
}

export class BooleanValue extends Value implements Comparable {
  constructor(public value: boolean) {
    super('boolean', value);
  }
}

export class NumberValue extends Value implements Comparable, Orderable {
  constructor(public value: number) {
    super('number', value);
  }
}

export class StringValue extends Value implements Comparable, Likeable {
  constructor(public value: string) {
    super('string', value);
  }
}

export class DateValue extends Value implements Comparable, Orderable {
  constructor(public value: Date) {
    super('date', value);
  }
}
