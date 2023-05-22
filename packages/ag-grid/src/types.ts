export interface FilterModel {
  [column: string]: Filter;
}

export type Filter = SingleFilter | MultiFilter;
export type SingleFilter = Condition | Comparison;
export type MultiFilter = {
  filterType: 'multi';
  filterModels: Array<SingleFilter>;
};
export type FilterType = 'text' | 'number' | 'date' | 'set';

export interface Condition {
  operator: LogicOperator;
  condition1: Comparison;
  condition2: Comparison;
  filterType: string;
}
export type LogicOperator = 'AND' | 'OR';

export interface Comparison {
  type: Comparator;
  filterType: FilterType;
  filter: any;
  filterTo?: any;
}
export type Comparator =
  | 'equals'
  | 'notEqual'
  | 'lessThan'
  | 'lessThanOrEqual'
  | 'greaterThan'
  | 'greaterThanOrEqual'
  | 'inRange'
  | 'contains'
  | 'notContains'
  | 'startsWith'
  | 'endsWith'
  | 'blank'
  | 'notBlank'
  | 'in';

export interface DateComparison {
  type: Comparator;
  filterType: FilterType;
  dateFrom: any;
  dateTo: any;
}
export interface SetComparison {
  type: Comparator;
  filterType: FilterType;
  values: Set;
}
export type Set = Array<string | null>;

export function isSingleFilter(filter: Filter): filter is SingleFilter {
  return !isMultiFilter(filter);
}

export function isMultiFilter(filter: Filter): filter is MultiFilter {
  return filter.filterType == 'multi';
}

export function isCondition(filter: SingleFilter): filter is Condition {
  return 'operator' in filter;
}

export function isComparison(filter: SingleFilter): filter is Comparison {
  return !isCondition(filter);
}

export function isDateComparison(
  comparison: Comparison | DateComparison | SetComparison
): comparison is DateComparison {
  return comparison.filterType == 'date';
}

export function isSetComparison(
  comparison: Comparison | DateComparison | SetComparison
): comparison is SetComparison {
  return comparison.filterType == 'set';
}
