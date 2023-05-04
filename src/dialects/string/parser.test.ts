import { describe, expect, test } from '@jest/globals';
import { Builder } from 'base/builder';
import { StringParser } from '.';

const parser = new StringParser();
const builder = new Builder();

describe('values', () => {
  // Null
  test('Null (equals)', () => {
    expect(
      parser.parse('var = null') //
    ).toEqual(
      builder.root(builder.eq('var', null)) //
    );
  });
  test('Null (with is)', () => {
    expect(
      parser.parse('var is null') //
    ).toEqual(
      builder.root(builder.is('var', null)) //
    );
  });
  // Empty
  test('Empty (with equals)', () => {
    expect(
      () => parser.parse('var = empty') //
    ).toThrowError();
  });
  test('Empty (with is)', () => {
    expect(
      parser.parse('var is empty') //
    ).toEqual(
      builder.root(builder.is('var', 'empty')) //
    );
  });
  // Boolean
  test('Boolean (false)', () => {
    expect(
      parser.parse('var = false') //
    ).toEqual(
      builder.root(builder.eq('var', false)) //
    );
  });
  test('Boolean (true)', () => {
    expect(
      parser.parse('var = true') //
    ).toEqual(
      builder.root(builder.eq('var', true)) //
    );
  });
  // Number
  test('Number (integer)', () => {
    expect(
      parser.parse(`var = ${42}`) //
    ).toEqual(
      builder.root(builder.eq('var', 42)) //
    );
  });
  test('Number (float)', () => {
    expect(
      parser.parse(`var = ${42.678}`) //
    ).toEqual(
      builder.root(builder.eq('var', 42.678)) //
    );
  });
  test('Number (Infinity)', () => {
    expect(
      () => parser.parse(`var = ${Infinity}`) //
    ).toThrowError();
  });
  test('Number (NaN)', () => {
    expect(
      () => parser.parse(`var = ${NaN}`) //
    ).toThrowError();
  });
  // String
  test('String (no quotes)', () => {
    expect(
      () => parser.parse('var = myString') //
    ).toThrowError();
  });
  test('String (single quotes)', () => {
    expect(
      parser.parse("var = 'myString'") //
    ).toEqual(
      builder.root(builder.eq('var', 'myString')) //
    );
  });
  test('String (double quotes)', () => {
    expect(
      parser.parse('var = "myString"') //
    ).toEqual(
      builder.root(builder.eq('var', 'myString')) //
    );
  });
  test('String (backtick quotes)', () => {
    expect(
      () => parser.parse('var = `myString`') //
    ).toThrowError();
  });
});

describe('Comparisons', () => {
  test('Equals', () => {
    expect(
      parser.parse('var = "myString"') //
    ).toEqual(
      builder.root(builder.eq('var', 'myString')) //
    );
  });
  test('NotEquals', () => {
    expect(
      parser.parse('var != "myString"') //
    ).toEqual(
      builder.root(builder.neq('var', 'myString')) //
    );
  });
  test('LessThan', () => {
    expect(
      parser.parse('var < 10') //
    ).toEqual(
      builder.root(builder.lt('var', 10)) //
    );
  });
  test('LessThanEquals', () => {
    expect(
      parser.parse('var <= 10') //
    ).toEqual(
      builder.root(builder.lte('var', 10)) //
    );
  });
  test('GreaterThan', () => {
    expect(
      parser.parse('var > 10') //
    ).toEqual(
      builder.root(builder.gt('var', 10)) //
    );
  });
  test('GreaterThanEquals', () => {
    expect(
      parser.parse('var >= 10') //
    ).toEqual(
      builder.root(builder.gte('var', 10)) //
    );
  });
  test('Like', () => {
    expect(
      parser.parse('var ~ "%pattern%"') //
    ).toEqual(
      builder.root(builder.like('var', '%pattern%')) //
    );
  });
  test('Is (null)', () => {
    expect(
      parser.parse('var is null') //
    ).toEqual(
      builder.root(builder.is('var', null)) //
    );
  });
  test('Is (empty)', () => {
    expect(
      parser.parse('var is empty') //
    ).toEqual(
      builder.root(builder.is('var', 'empty')) //
    );
  });
  test('IsNot (null)', () => {
    expect(
      parser.parse('var is not null') //
    ).toEqual(
      builder.root(builder.isNot('var', null)) //
    );
  });
  test('IsNot (empty)', () => {
    expect(
      parser.parse('var is not empty') //
    ).toEqual(
      builder.root(builder.isNot('var', 'empty')) //
    );
  });
  test('In (empty array)', () => {
    expect(
      parser.parse('var in []') //
    ).toEqual(
      builder.root(builder.in('var', [])) //
    );
  });
  test('In (single element)', () => {
    expect(
      parser.parse('var in [null, true, 10, 5.5, "myString"]') //
    ).toEqual(
      builder.root(builder.in('var', [null, true, 10, 5.5, 'myString'])) //
    );
  });
  test('In (multiple elements, same types)', () => {
    expect(
      parser.parse('var in [1, 2, 3]') //
    ).toEqual(
      builder.root(builder.in('var', [1, 2, 3])) //
    );
  });
  test('In (multiple elements, different types)', () => {
    expect(
      parser.parse('var in [null, true, 10, 5.5, "myString"]') //
    ).toEqual(
      builder.root(builder.in('var', [null, true, 10, 5.5, 'myString'])) //
    );
  });
  test('NotIn', () => {
    expect(
      parser.parse('var not in [null, true, 10, 5.5, "myString"]') //
    ).toEqual(
      builder.root(builder.notIn('var', [null, true, 10, 5.5, 'myString'])) //
    );
  });
});

describe('conditions', () => {
  test('Not', () => {
    expect(
      parser.parse('not var = 1') //
    ).toEqual(
      builder.root(builder.not(builder.eq('var', 1))) //
    );
  });
  test('And', () => {
    expect(
      parser.parse('var > 1 and var = 1') //
    ).toEqual(
      builder.root(builder.and(builder.gt('var', 1), builder.eq('var', 1))) //
    );
  });
  test('Or', () => {
    expect(
      parser.parse('var > 1 or var = 1') //
    ).toEqual(
      builder.root(builder.or(builder.gt('var', 1), builder.eq('var', 1))) //
    );
  });
});

// describe('functions', () => {});

// describe('parantheses', () => {});
