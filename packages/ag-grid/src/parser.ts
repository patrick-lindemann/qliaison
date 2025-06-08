import * as Ast from '@qliaison/core';
import { ParseTree, Parser } from '@qliaison/core';
import {
  DateFilterModel,
  ICombinedSimpleModel,
  IMultiFilterModel,
  ISimpleFilterModel,
  NumberFilterModel,
  SetFilterModel,
  TextFilterModel
} from 'ag-grid-community';
import {
  isBoolean,
  isCombinedSimpleModel,
  isMultiFilterModel,
  isNumeric,
  parseDate
} from './utils';

/* Types */

export type FilterModel =
  | TextFilterModel
  | NumberFilterModel
  | DateFilterModel
  | SetFilterModel;

export type ColumnFilterModels = {
  [column: string]:
    | FilterModel
    | ICombinedSimpleModel<FilterModel>
    | IMultiFilterModel;
};

/* Classes */

export class AgGridFilterParser extends Parser<ColumnFilterModels> {
  parse(input: ColumnFilterModels): ParseTree {
    return this.root(input);
  }

  protected root(filters: ColumnFilterModels): Ast.Root {
    const entries = Object.entries(filters);
    switch (entries.length) {
      case 0:
        throw new SyntaxError('Empty filter model specified.');
      case 1: {
        const [column, filter] = entries[0];
        const node = this.filterModel(column, filter);
        return new Ast.Root(node);
      }
    }
    const nodes = entries
      .map(([column, filter]) => this.filterModel(column, filter))
      .reduce((acc, node) => (acc ? new Ast.And(acc, node) : node));
    return new Ast.Root(nodes);
  }

  protected filterModel(
    column: string,
    model:
      | ISimpleFilterModel
      | ICombinedSimpleModel<ISimpleFilterModel>
      | IMultiFilterModel
  ): Ast.Condition | Ast.Comparison {
    if (isMultiFilterModel(model)) {
      return this.multiFilterModel(column, model);
    } else if (isCombinedSimpleModel(model)) {
      return this.combinedSimpleModel(column, model);
    } else {
      return this.simpleFilterModel(column, model);
    }
  }

  protected multiFilterModel(
    column: string,
    model: IMultiFilterModel
  ): Ast.Condition | Ast.Comparison {
    if (!model.filterModels || model.filterModels.length === 0) {
      throw new SyntaxError('Empty Filter specified in MultiFilter.');
    }
    const result = model.filterModels
      .map((m) => this.filterModel(column, model))
      .reduce((acc, node) => (acc ? new Ast.And(acc, node) : node));
    return result;
  }

  protected combinedSimpleModel(
    column: string,
    model: ICombinedSimpleModel<ISimpleFilterModel>
  ): Ast.Condition | Ast.Comparison {
    // Ensure backwards compability with deprecated properties 'condition1' and 'condition2'
    // @ts-ignore
    const conditions = model.conditions || [model.condition1, model.condition2];
    const Operator = model.operator === 'OR' ? Ast.Or : Ast.And;
    if (conditions.length === 0) {
      throw new SyntaxError(
        `Empty condition specified for column '${column}'.`
      );
    } else if (conditions.length === 1) {
      return this.simpleFilterModel(column, conditions[0]);
    }
    const result = conditions
      .map((model) => this.simpleFilterModel(column, model))
      .reduce((acc, node) => (acc ? new Operator(acc, node) : node));
    return result;
  }

  protected simpleFilterModel(
    column: string,
    model: ISimpleFilterModel
  ): Ast.Condition | Ast.Comparison {
    switch (model.filterType) {
      case 'text':
        return this.textFilterModel(column, model as TextFilterModel);
      case 'number':
        return this.numberFilterModel(column, model as NumberFilterModel);
      case 'date':
        return this.dateFilterModel(column, model as DateFilterModel);
      case 'set':
        return this.setFilterModel(column, model as SetFilterModel);
      default:
        throw new SyntaxError(`Unsupported filter type "${model.filterType}".`);
    }
  }

  protected textFilterModel(
    column: string,
    model: TextFilterModel
  ): Ast.Condition | Ast.Comparison {
    const columnNode = new Ast.Variable(column);
    if (model.filter === undefined || model.filter === null) {
      switch (model.type) {
        case 'blank':
          return new Ast.Or(
            new Ast.Equals(columnNode, new Ast.NullValue()),
            new Ast.Equals(columnNode, new Ast.StringValue(''))
          );
        case 'notBlank':
          return new Ast.And(
            new Ast.NotEquals(columnNode, new Ast.NullValue()),
            new Ast.NotEquals(columnNode, new Ast.StringValue(''))
          );
        default:
          throw new SyntaxError(
            `No filter specified for column '${column}' and filter type '${model.type}'.`
          );
      }
    }
    switch (model.type) {
      case 'equals':
        return new Ast.Equals(columnNode, new Ast.StringValue(model.filter));
      case 'notEqual':
        return new Ast.NotEquals(columnNode, new Ast.StringValue(model.filter));
      case 'startsWith':
        return new Ast.Like(
          columnNode,
          new Ast.StringValue(model.filter + '%')
        );
      case 'endsWith':
        return new Ast.Like(
          columnNode,
          new Ast.StringValue('%' + model.filter)
        );
      case 'contains':
        return new Ast.Like(
          columnNode,
          new Ast.StringValue('%' + model.filter + '%')
        );
      case 'notContains':
        return new Ast.NotLike(
          columnNode,
          new Ast.StringValue('%' + model.filter + '%')
        );
      default:
        // https://www.ag-grid.com/angular-data-grid/filter-text/#text-filter-options
        throw new SyntaxError(
          `Unsupported filter type "${model.type}" for text comparison.`
        );
    }
  }

  protected numberFilterModel(
    column: string,
    model: NumberFilterModel
  ): Ast.Condition | Ast.Comparison {
    const columnNode = new Ast.Variable(column);
    if (model.filter === undefined || model.filter === null) {
      switch (model.type) {
        case 'blank':
          return new Ast.Equals(columnNode, new Ast.NullValue());
        case 'notBlank':
          return new Ast.NotEquals(columnNode, new Ast.NullValue());
        default:
          throw new SyntaxError(
            `No filter specified for column '${column}' and filter type '${model.type}'.`
          );
      }
    }
    const valueNode = new Ast.NumberValue(model.filter);
    switch (model.type) {
      case 'equals':
        return new Ast.Equals(columnNode, valueNode);
      case 'notEqual':
        return new Ast.NotEquals(columnNode, valueNode);
      case 'lessThan':
        return new Ast.LessThan(columnNode, valueNode);
      case 'lessThanOrEqual':
        return new Ast.LessThanEquals(columnNode, valueNode);
      case 'greaterThan':
        return new Ast.GreaterThan(columnNode, valueNode);
      case 'greaterThanOrEqual':
        return new Ast.GreaterThanEquals(columnNode, valueNode);
      case 'inRange': {
        if (model.filterTo === undefined || model.filterTo === null) {
          throw new SyntaxError(
            `Empty filterTo specified for column '${column}' and filter type 'inRange'`
          );
        }
        const valueToNode = new Ast.NumberValue(model.filterTo);
        return new Ast.And(
          new Ast.GreaterThanEquals(columnNode, valueNode),
          new Ast.LessThanEquals(columnNode, valueToNode)
        );
      }
      default:
        // https://www.ag-grid.com/angular-data-grid/filter-number/#number-filter-options
        throw new SyntaxError(
          `Unsupported filter type "${model.type}" for text comparison.`
        );
    }
  }

  protected dateFilterModel(
    column: string,
    model: DateFilterModel
  ): Ast.Condition | Ast.Comparison {
    const columnNode = new Ast.Variable(column);
    if (model.dateFrom === null) {
      switch (model.type) {
        case 'blank':
          return new Ast.Equals(columnNode, new Ast.NullValue());
        case 'notBlank':
          return new Ast.NotEquals(columnNode, new Ast.NullValue());
        default:
          throw new SyntaxError(
            `No filter specified for column '${column}' and filter type '${model.type}'.`
          );
      }
    }
    const valueNode = new Ast.DateValue(parseDate(model.dateFrom));
    switch (model.type) {
      case 'equals':
        return new Ast.Equals(columnNode, valueNode);
      case 'notEqual':
        return new Ast.NotEquals(columnNode, valueNode);
      case 'lessThan':
        return new Ast.LessThan(columnNode, valueNode);
      case 'greaterThan':
        return new Ast.GreaterThan(columnNode, valueNode);
      case 'inRange': {
        if (!model.dateTo) {
          throw new SyntaxError(
            `Empty filterTo specified for column '${column}' and filter type 'inRange'`
          );
        }
        const valueToNode = new Ast.DateValue(parseDate(model.dateTo));
        return new Ast.And(
          new Ast.GreaterThanEquals(columnNode, valueNode),
          new Ast.LessThanEquals(columnNode, valueToNode)
        );
      }
      default:
        // https://www.ag-grid.com/angular-data-grid/filter-date/#date-filter-options
        throw new SyntaxError(
          `Unsupported filter type "${model.type}" for text comparison.`
        );
    }
  }

  protected setFilterModel(
    column: string,
    model: SetFilterModel
  ): Ast.Condition | Ast.Comparison {
    const columnNode = new Ast.Variable(column);
    const valueNode = new Ast.Array(
      model.values.map((value) => {
        if (value === null) {
          return new Ast.NullValue();
        }
        // Special cases: boolean and number values are stored as strings
        if (isBoolean(value)) {
          return new Ast.BooleanValue(value === 'true');
        }
        if (isNumeric(value)) {
          return new Ast.NumberValue(parseFloat(value));
        }
        return new Ast.StringValue(value);
      })
    );
    return new Ast.In(columnNode, valueNode);
  }
}
