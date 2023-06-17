import { describe, expect, test } from '@jest/globals';
import { Builder } from '@qliaison/core';
import { QueryParser } from './parser';

const parser = new QueryParser();
const builder = new Builder();

describe('Eol', () => {
  test('Empty query', () => {
    expect(
      () => parser.parse('') //
    ).toThrowError();
  });
  test('Unfinished query', () => {
    expect(
      () => parser.parse('var') //
    ).toThrowError();
  });
});

describe('Whitespaces', () => {
  test('No Whitespace', () => {
    expect(
      parser.parse('var=1') //
    ).toEqual(
      builder.root(builder.eq('var', 1)) //
    );
  });
  test('Single Spaces', () => {
    expect(
      parser.parse(' var = 1 ') //
    ).toEqual(
      builder.root(builder.eq('var', 1)) //
    );
  });
  test('Multiple Spaces', () => {
    expect(
      parser.parse('  var  =  1  ') //
    ).toEqual(
      builder.root(builder.eq('var', 1)) //
    );
  });
  test('Tabs', () => {
    expect(
      parser.parse('\tvar\t=\t1\t') //
    ).toEqual(
      builder.root(builder.eq('var', 1)) //
    );
  });
  test('Newlines', () => {
    expect(
      parser.parse('\nvar\n=\n1\n') //
    ).toEqual(
      builder.root(builder.eq('var', 1)) //
    );
  });
});

describe('values', () => {
  // Null
  test('Null', () => {
    expect(
      parser.parse('var = null') //
    ).toEqual(
      builder.root(builder.eq('var', null)) //
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
  test('NotLike', () => {
    expect(
      parser.parse('var !~ "%pattern%"') //
    ).toEqual(
      builder.root(builder.notLike('var', '%pattern%')) //
    );
  });
  test('ILike', () => {
    expect(
      parser.parse('var ~~ "%pattern%"') //
    ).toEqual(
      builder.root(builder.iLike('var', '%pattern%')) //
    );
  });
  test('NotILike', () => {
    expect(
      parser.parse('var !~~ "%pattern%"') //
    ).toEqual(
      builder.root(builder.notILike('var', '%pattern%')) //
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

describe('Conditions', () => {
  test('Not', () => {
    expect(
      parser.parse('not var = 1') //
    ).toEqual(
      builder.root(builder.not(builder.eq('var', 1))) //
    );
  });
  test('And (Binary)', () => {
    expect(
      parser.parse('var > 1 and var < 2') //
    ).toEqual(
      builder.root(builder.and(builder.gt('var', 1), builder.lt('var', 2))) //
    );
  });
  test('And (NAry)', () => {
    expect(
      parser.parse('var > 1 and var = 2 and var < 3') //
    ).toEqual(
      builder.root(
        builder.and(
          builder.gt('var', 1), //
          builder.eq('var', 2), //
          builder.lt('var', 3)
        )
      )
    );
  });
  test('Or', () => {
    expect(
      parser.parse('var > 1 or var < 2') //
    ).toEqual(
      builder.root(builder.or(builder.gt('var', 1), builder.lt('var', 2))) //
    );
  });
  test('Or (NAry)', () => {
    expect(
      parser.parse('var > 1 or var = 2 or var < 3') //
    ).toEqual(
      builder.root(
        builder.or(
          builder.gt('var', 1), //
          builder.eq('var', 2), //
          builder.lt('var', 3)
        )
      )
    );
  });
});

describe('Functions', () => {
  test('Function without arguments', () => {
    expect(
      parser.parse('var = myFunc()') //
    ).toEqual(
      builder.root(
        builder.eq(
          'var', //
          builder.function('myFunc') //
        )
      )
    );
  });
  test('Function with boolean argument', () => {
    expect(
      parser.parse('var = myFunc(true)') //
    ).toEqual(
      builder.root(
        builder.eq(
          'var', //
          builder.function('myFunc', true) //
        )
      )
    );
  });
  test('Function with integer argument', () => {
    expect(
      parser.parse('var = myFunc(2)') //
    ).toEqual(
      builder.root(
        builder.eq(
          'var', //
          builder.function('myFunc', 2) //
        )
      )
    );
  });
  test('Function with float argument', () => {
    expect(
      parser.parse('var = myFunc(24.8)') //
    ).toEqual(
      builder.root(
        builder.eq(
          'var', //
          builder.function('myFunc', 24.8) //
        )
      )
    );
  });
  test('Function with string argument', () => {
    expect(
      parser.parse('var = myFunc("myString")') //
    ).toEqual(
      builder.root(
        builder.eq(
          'var', //
          builder.function('myFunc', 'myString') //
        )
      )
    );
  });
  test('Function with 2 arguments', () => {
    expect(
      parser.parse('var = myFunc(false, 2)') //
    ).toEqual(
      builder.root(
        builder.eq(
          'var', //
          builder.function('myFunc', false, 2) //
        )
      )
    );
  });
  test('Function with 3 arguments', () => {
    expect(
      parser.parse('var = myFunc(true, 1, "myString")') //
    ).toEqual(
      builder.root(
        builder.eq(
          'var', //
          builder.function('myFunc', true, 1, 'myString') //
        )
      )
    );
  });
  test('Nested function without arguments', () => {
    expect(
      parser.parse('var = outer(inner())') //
    ).toEqual(
      builder.root(
        builder.eq(
          'var', //
          builder.function('outer', builder.function('inner')) //
        )
      )
    );
  });
  test('Nested function with 1 argument', () => {
    expect(
      parser.parse('var = outer(inner(1))') //
    ).toEqual(
      builder.root(
        builder.eq(
          'var', //
          builder.function('outer', builder.function('inner', 1)) //
        )
      )
    );
  });
  test('Complex nested function', () => {
    expect(
      parser.parse('var = outer(a(), b(bb(false), 66.8), c(3), "myString")') //
    ).toEqual(
      builder.root(
        builder.eq(
          'var',
          builder.function(
            'outer',
            builder.function('a'),
            builder.function('b', builder.function('bb', false), 66.8),
            builder.function('c', 3),
            'myString'
          )
        )
      )
    );
  });
});

// describe('parantheses', () => {});

// describe('Complex Queries', () => {});
