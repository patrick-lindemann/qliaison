import type { Visitor } from 'core/visitor';
import { AstNode } from './ast';

/* Types */

export type Type = (typeof types)[number];

/* Constants */

export const types = ['null', 'empty', 'boolean', 'number', 'string', 'date'];

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

export class Null extends Value {
  constructor() {
    super('null', null);
  }
}

export class Empty extends Value {
  constructor() {
    super('empty', '');
  }
}

export class Boolean extends Value {
  constructor(public value: boolean) {
    super('boolean', value);
  }
}

export class Number extends Value {
  constructor(public value: number) {
    super('number', value);
  }
}

export class String extends Value {
  constructor(public value: string) {
    super('string', value);
  }
}

export class Date extends Value {
  constructor(public value: Date) {
    super('date', value);
  }
}
