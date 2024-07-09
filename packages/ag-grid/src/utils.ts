import {
  ICombinedSimpleModel,
  IMultiFilterModel,
  ISimpleFilterModel,
  ProvidedFilterModel
} from 'ag-grid-community';

/**
 * Parse a date value as provided in by AG Grid in the format 'YYYY-MM-DD hh:mm:ss'.
 *
 * FIXME: This can lead to bugs, but since this is an error on the AG Grid side,
 * currently, there is nothing we can do.
 *
 * @param value The value in the format 'YYYY-MM-DD hh:mm:ss'
 * @returns The parsed date, assuming the string was in the local time zone
 */
export function parseDate(value: string): Date {
  return new Date(Date.parse(value));
}

export function isCombinedSimpleModel(
  model: ProvidedFilterModel
): model is ICombinedSimpleModel<ISimpleFilterModel> {
  // Check deprecated property 'condition1' for backwards compatibility
  return 'conditions' in model || 'condition1' in model;
}

export function isMultiFilterModel(
  model: ProvidedFilterModel
): model is IMultiFilterModel {
  return model.filterType === 'multi';
}

export function isBoolean(value: string): boolean {
  return value === 'true' || value === 'false';
}

export function isNumeric(value: string): boolean {
  return !isNaN(parseFloat(value));
}
