import { describe, test } from '@jest/globals';
import {
  BooleanValue,
  DateValue,
  NullValue,
  NumberValue,
  StringValue
} from 'base/ast';
import { Builder } from './builder';

// The builder is stateless and can be used as a constant
const builder = new Builder();

// Values
describe('Value tests', () => {
  // TODO: Test undefined
  test('Test null', () => {
    expect(builder._value(null)).toEqual(new NullValue());
  });
  test('Test boolean', () => {
    expect(builder._value(false)).toEqual(new BooleanValue(false));
    expect(builder._value(true)).toEqual(new BooleanValue(true));
  });
  test('Test interger numbers', () => {
    expect(builder._value(0)).toEqual(new NumberValue(0));
    expect(builder._value(42)).toEqual(new NumberValue(42));
    expect(builder._value(-256)).toEqual(new NumberValue(-256));
    expect(builder._value(Infinity)).toEqual(new NumberValue(Infinity));
    expect(builder._value(-Infinity)).toEqual(new NumberValue(-Infinity));
    expect(builder._value(NaN)).toEqual(new NumberValue(NaN)); // TODO: Should fail
  });
  test('Test floating numbers', () => {
    expect(builder._value(0.0)).toEqual(new NumberValue(0));
    expect(builder._value(3.141592653)).toEqual(new NumberValue(3.141592653));
    expect(builder._value(-2.718281828)).toEqual(new NumberValue(-2.718281828));
  });
  test('Test strings', () => {
    expect(builder._value('')).toEqual(new StringValue(''));
    expect(builder._value('My string')).toEqual(new StringValue('My string'));
    expect(builder._value('null')).toEqual(new StringValue('null'));
    expect(builder._value('empty')).toEqual(new StringValue('empty'));
  });
  test('Test dates', () => {
    const now = new Date();
    expect(builder._value(new Date(0))).toEqual(new DateValue(new Date(0)));
    expect(builder._value(now)).toEqual(new DateValue(now));
    expect(builder._value(new Date(NaN))).toEqual(new DateValue(new Date(NaN))); // TODO: Should fail
  });
});

// Test equivalence comparators (eq, neq)
// Test order comparators (lt, lte, gt, gte)
// Test like comparator
// Test is comparators (is, is_not)
// Test in comparators (in, not_in)

// Each with their respective primitive types

// Test conditions (and, or)
// With 2 elements and more

// Test variable (Variable can b keyword and )

// Operators
/*
describe('Equal Operator Tests', () => {
  test('Test string', () => {
    expect(builder.eq('firstName', 'Max')).toEqual(
      new Equals(
        new Variable('firstName'), //
        new StringValue('Max') //
      )
    );
  });
  test('Test date', () => {
    expect(builder.eq('firstName', 'Max')).toEqual(
      new Equals(
        new Variable('firstName'), //
        new StringValue('Max') //
      )
    );
  });
  //
  // Test primitive types
  test('Test');
  const tree = builder.root(builder.eq('', 1));

  test('Test', () => {
    const tree = builder.root(builder.eq('firstName', 'Max'));
    expect(tree).toEqual(new Root(new Equals('firstName', 'Max')));
  });
  test();
});

describe('Test simple queries', () => {
  test('Condition', () => {});
  test('Test comparison', () => {});
});
*/
