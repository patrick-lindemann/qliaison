import { describe, expect, test } from '@jest/globals';
import { Builder } from '@qliaison/core';
import { QuerySerializer } from './serializer';

const builder = new Builder();
const serializer = new QuerySerializer();

describe('Values', () => {
  test('Null', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.eq('var', null) //
        )
      )
    ).toEqual('var = null');
  });
  test('Boolean (false)', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.eq('var', false) //
        )
      )
    ).toEqual('var = false');
  });
  test('Boolean (true)', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.eq('var', true) //
        )
      )
    ).toEqual('var = true');
  });
  test('Number (integer)', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.eq('var', 42) //
        )
      )
    ).toEqual('var = 42');
  });
  test('Number (float)', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.eq('var', 42.678) //
        )
      )
    ).toEqual('var = 42.678');
  });
  test('Number (Infinity)', () => {
    expect(() =>
      serializer.serialize(
        builder.root(
          builder.eq('var', Infinity) //
        )
      )
    ).toThrowError();
  });
  test('Number (NaN)', () => {
    expect(() =>
      serializer.serialize(
        builder.root(
          builder.eq('var', Infinity) //
        )
      )
    ).toThrowError();
  });
  test('String', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.eq('var', 'myString') //
        )
      )
    ).toEqual('var = "myString"');
  });
});

describe('Comparisons', () => {
  test('Equals', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.eq('var', 'myString') //
        )
      )
    ).toEqual('var = "myString"');
  });
  test('NotEquals', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.neq('var', 'myString') //
        )
      )
    ).toEqual('var != "myString"');
  });
  test('LessThan', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.lt('var', 10) //
        )
      )
    ).toEqual('var < 10');
  });
  test('LessThanEquals', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.lte('var', 10) //
        )
      )
    ).toEqual('var <= 10');
  });
  test('GreaterThan', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.gt('var', 10) //
        )
      )
    ).toEqual('var > 10');
  });
  test('GreaterThanEquals', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.gte('var', 10) //
        )
      )
    ).toEqual('var >= 10');
  });
  test('Like', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.like('var', '%pattern%') //
        )
      )
    ).toEqual('var ~ "%pattern%"');
  });
  test('NotLike', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.notLike('var', '%pattern%') //
        )
      )
    ).toEqual('var !~ "%pattern%"');
  });
  test('In (empty array)', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.in('var', []) //
        )
      )
    ).toEqual('var in []');
  });
  test('In (single element)', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.in('var', [1]) //
        )
      )
    ).toEqual('var in [1]');
  });
  test('In (multiple elements, same types)', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.in('var', [1, 2, 3]) //
        )
      )
    ).toEqual('var in [1, 2, 3]');
  });
  test('In (multiple elements, different types)', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.in('var', [null, true, 10, 5.5, 'myString']) //
        )
      )
    ).toEqual('var in [null, true, 10, 5.5, "myString"]');
  });
  test('NotIn', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.notIn('var', [null, true, 10, 5.5, 'myString']) //
        )
      )
    ).toEqual('var not in [null, true, 10, 5.5, "myString"]');
  });
});

describe('Conditions', () => {
  test('Not', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.not(
            builder.eq('var', 'myString') //
          )
        )
      )
    ).toEqual('not var = "myString"');
  });
  test('And', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.and(
            builder.gt('var', 1), //
            builder.lt('var', 2)
          )
        )
      )
    ).toEqual('var > 1 and var < 2');
  });
  test('And (NAry)', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.and(
            builder.gt('var', 1), //
            builder.eq('var', 2),
            builder.lt('var', 3)
          )
        )
      )
    ).toEqual('var > 1 and var = 2 and var < 3');
  });
  test('Or', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.or(
            builder.eq('var', 'myString'), //
            builder.eq('var', 42)
          )
        )
      )
    ).toEqual('var = "myString" or var = 42');
  });
  test('Or (NAry)', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.or(
            builder.gt('var', 1), //
            builder.eq('var', 2),
            builder.lt('var', 3)
          )
        )
      )
    ).toEqual('var > 1 or var = 2 or var < 3');
  });
  test('And not', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.and(
            builder.gt('var', 1), //
            builder.not(
              builder.lt('var', 2) //
            )
          )
        )
      )
    ).toEqual('var > 1 and not var < 2');
  });
  test('Or not', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.or(
            builder.gt('var', 1), //
            builder.not(
              builder.lt('var', 2) //
            )
          )
        )
      )
    ).toEqual('var > 1 or not var < 2');
  });
});

describe('Functions', () => {
  test('Function without arguments', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.eq(
            'var', //
            builder.function('myFunc')
          )
        )
      )
    ).toEqual('var = myFunc()');
  });
  test('Function with boolean argument', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.eq(
            'var', //
            builder.function('myFunc', true)
          )
        )
      )
    ).toEqual('var = myFunc(true)');
  });
  test('Function with integer argument', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.eq(
            'var', //
            builder.function('myFunc', 42)
          )
        )
      )
    ).toEqual('var = myFunc(42)');
  });
  test('Function with float argument', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.eq(
            'var', //
            builder.function('myFunc', 42.678)
          )
        )
      )
    ).toEqual('var = myFunc(42.678)');
  });
  test('Function with string argument', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.eq(
            'var', //
            builder.function('myFunc', 'myString')
          )
        )
      )
    ).toEqual('var = myFunc("myString")');
  });
  test('Function with 2 arguments', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.eq(
            'var', //
            builder.function('myFunc', 'myString', 42)
          )
        )
      )
    ).toEqual('var = myFunc("myString", 42)');
  });
  test('Function with 3 arguments', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.eq(
            'var', //
            builder.function('myFunc', 'myString', 42, true)
          )
        )
      )
    ).toEqual('var = myFunc("myString", 42, true)');
  });
  test('Nested function without arguments', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.eq(
            'var', //
            builder.function('outer', builder.function('inner'))
          )
        )
      )
    ).toEqual('var = outer(inner())');
  });
  test('Nested function with 1 argument', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.eq(
            'var', //
            builder.function('outer', builder.function('inner', 1))
          )
        )
      )
    ).toEqual('var = outer(inner(1))');
  });
  test('Complex nested function', () => {
    expect(
      serializer.serialize(
        builder.root(
          builder.eq(
            'var', //
            builder.function(
              'outer',
              builder.function('a'),
              builder.function('b', builder.function('bb', false), 66.8),
              builder.function('c', 3),
              'myString'
            )
          )
        )
      )
    ).toEqual('var = outer(a(), b(bb(false), 66.8), c(3), "myString")');
  });
});
