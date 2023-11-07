import { ParseTree } from '@qliaison/core';
import { AgGridFilterParser, ColumnFilterModels } from './parser';

export function parseAgGridFilter(value: ColumnFilterModels): ParseTree {
  return new AgGridFilterParser().parse(value);
}

export { AgGridFilterParser };
