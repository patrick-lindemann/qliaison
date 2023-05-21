import * as Ast from 'base/ast';
import { Parser } from 'base/parser';
import { ParseTree } from 'base/types';
import type * as Ag from './types';
import {
  isCondition,
  isDateComparison,
  isMultiFilter,
  isSetComparison
} from './types';

/* Types */

type Include<T, U extends T> = U;

/* Constants */

const classes: Record<
  Include<
    Ag.Comparator,
    | 'equals'
    | 'notEqual'
    | 'lessThan'
    | 'lessThanOrEqual'
    | 'greaterThan'
    | 'greaterThanOrEqual'
  >,
  new (field: Ast.Variable, value: Ast.Value) => Ast.Comparison
> = {
  equals: Ast.Equals,
  notEqual: Ast.NotEquals,
  lessThan: Ast.LessThan,
  lessThanOrEqual: Ast.LessThanEquals,
  greaterThan: Ast.GreaterThan,
  greaterThanOrEqual: Ast.GreaterThanEquals
};

const selectors: Record<
  Include<Ag.Comparator, 'startsWith' | 'endsWith' | 'contains'>,
  (filter: Ag.Comparison) => string
> = {
  startsWith: (comparison) => comparison.filter + '%',
  endsWith: (comparison) => '%' + comparison.filter,
  contains: (comparison) => '%' + comparison.filter + '%'
};

/* Classes */

export class AgGridFilterParser extends Parser<Ag.FilterModel> {
  parse(input: Ag.FilterModel): ParseTree {
    return this.root(input);
  }

  protected root(model: Ag.FilterModel): Ast.Root {
    const entries = Object.entries(model);
    switch (entries.length) {
      case 0:
        return new Ast.Root();
      case 1: {
        const [column, filter] = entries[0];
        const node = this.filter(column, filter);
        return new Ast.Root(node);
      }
    }
    const nodes = entries.map(([column, filter]) =>
      this.filter(column, filter)
    );
    return new Ast.Root(and(...nodes));
  }

  protected filter(
    column: string,
    filter: Ag.Filter
  ): Ast.Condition | Ast.Comparison {
    if (isMultiFilter(filter)) {
      const models = filter.filterModels.filter((v) => v !== null);
      if (models.length == 0) {
        throw new SyntaxError(
          `Empty Filter specified in MultiFilter for column '${column}'.`
        );
      }
      return and(...models);
    } else if (isCondition(filter)) {
      return this.condition(column, filter);
    } else {
      return this.comparison(column, filter);
    }
  }

  protected condition(column: string, cond: Ag.Condition): Ast.Condition {
    const left = this.comparison(column, cond.condition1);
    const right = this.comparison(column, cond.condition2);
    if (cond.operator == 'AND') {
      return new Ast.And(left, right);
    }
    return new Ast.Or(left, right);
  }

  protected comparison(
    column: string,
    comp: Ag.Comparison
  ): Ast.Condition | Ast.Comparison {
    const field = new Ast.Variable(column);
    const { type, filterType, filter, filterTo } = toComparison(comp);
    switch (type) {
      case 'equals':
      case 'notEqual':
      case 'lessThan':
      case 'lessThanOrEqual':
      case 'greaterThan':
      case 'greaterThanOrEqual': {
        const value = this.value(column, filter, filterType);
        return new classes[type](field, value);
      }
      case 'inRange': {
        const lower = this.value(column, filter, filterType);
        const upper = this.value(column, filterTo, filterType);
        return new Ast.And(
          new Ast.GreaterThanEquals(field, lower),
          new Ast.LessThanEquals(field, upper)
        );
      }
      case 'startsWith':
      case 'endsWith':
      case 'contains': {
        const value = this.value(column, selectors[type](comp), 'text');
        return new Ast.Like(field, value);
      }
      case 'notContains': {
        const value = this.value(column, selectors['contains'], 'text');
        return new Ast.NotLike(field, value);
      }
      case 'blank':
      case 'notBlank': {
        let result: Ast.Condition | Ast.Comparison = isNull(field);
        if (comp.filterType == 'text') {
          result = new Ast.Or(result, isEmpty(field));
        }
        if (type == 'notBlank') {
          result = new Ast.Not(result);
        }
        return result;
      }
      case 'in': {
        const set = new Set(comp.filter as Ag.Set);
        if (set.size == 0) {
          return new Ast.In(field, new Ast.Array([]));
        }
        if (!set.has(null)) {
          const array = this.array(column, Array.from(set), filterType);
          return new Ast.In(field, array);
        }
        // Filter null values
        set.delete(null);
        if (set.size == 0) {
          return isNull(field);
        }
        return new Ast.Or(
          isNull(field),
          new Ast.In(field, this.array(column, Array.from(set), filterType))
        );
      }
    }
  }

  protected array(column: string, array: any[], type: Ag.FilterType) {
    if (type != 'set') {
      throw new Error(`Invalid cast from value to set for column ${column}.`);
    }
    const items = Array.from<string>(array).map(
      (item) => new Ast.Value('string', item)
    );
    return new Ast.Array(items);
  }

  protected value(column: string, value: any, type: Ag.FilterType): Ast.Value {
    switch (type) {
      case 'text':
        return new Ast.Value('string', value);
      case 'number':
        return new Ast.Value('number', value);
      case 'date':
        return new Ast.Value('date', value);
      case 'set':
        throw new Error(`Invalid cast from set to value for column ${column}.`);
    }
  }
}

/* Helper Functions */

function and(...nodes: any[]): Ast.Condition | Ast.Comparison | Ast.And {
  let result = nodes.pop();
  while (nodes.length > 0) {
    result = new Ast.And(result, nodes.pop());
  }
  return result;
}

function isNull(field: Ast.Variable): Ast.Comparison {
  return new Ast.Equals(field, new Ast.NullValue());
}

function isEmpty(field: Ast.Variable): Ast.Comparison {
  return new Ast.Equals(field, new Ast.StringValue(''));
}

export function toComparison(
  comparison: Ag.Comparison | Ag.DateComparison | Ag.SetComparison
): Ag.Comparison {
  if (isDateComparison(comparison)) {
    return {
      type: comparison.type,
      filterType: 'date',
      filter: comparison.dateFrom,
      filterTo: comparison.dateTo
    };
  } else if (isSetComparison(comparison)) {
    return {
      type: 'in',
      filterType: 'set',
      filter: comparison.values
    };
  }
  return comparison;
}
