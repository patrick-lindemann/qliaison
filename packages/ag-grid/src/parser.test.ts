import { describe, expect, test } from '@jest/globals';
import { Builder } from '@qliaison/core';
import { AgGridFilterParser } from './parser';

const parser = new AgGridFilterParser();
const builder = new Builder();

describe('Eol', () => {
  test('Empty filter model', () => {
    expect(
      () => parser.parse({}) //
    ).toThrowError();
  });
});

describe('Simple filter models', () => {
  test('Text', () => {
    expect(
      parser.parse({
        var: {
          filterType: 'text',
          type: 'equals',
          filter: 'myString'
        }
      })
    ).toEqual(
      builder.root(
        builder.eq('var', 'myString') //
      )
    );
  });
  test('Number', () => {
    expect(
      parser.parse({
        var: {
          filterType: 'number',
          type: 'equals',
          filter: 1
        }
      })
    ).toEqual(
      builder.root(
        builder.eq('var', 1) //
      )
    );
  });
  test('Date', () => {
    expect(
      parser.parse({
        var: {
          filterType: 'date',
          type: 'equals',
          // Dates always have the format 'yyyy-mm-dd hh:mm:ss'
          dateFrom: '2022-12-20 00:00:00',
          dateTo: null
        }
      })
    ).toEqual(
      builder.root(
        builder.eq('var', new Date(Date.parse('2022-12-20 00:00:00'))) //
      )
    );
  });
  test('Datetime', () => {
    expect(
      parser.parse({
        var: {
          filterType: 'date',
          type: 'equals',
          // Dates always have the format 'yyyy-mm-dd hh:mm:ss'
          dateFrom: '2022-12-20 12:48:03',
          dateTo: null
        }
      })
    ).toEqual(
      builder.root(
        builder.eq('var', new Date(Date.parse('2022-12-20 12:48:03'))) //
      )
    );
  });
  test('Set', () => {
    expect(
      parser.parse({
        var: {
          filterType: 'text',
          type: 'equals',
          filter: 'myString'
        }
      })
    ).toEqual(
      builder.root(
        builder.eq('var', 'myString') //
      )
    );
  });
});
