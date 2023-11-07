import { ParseTree } from '@qliaison/core';
import { JsonParser } from './parser';
import { JsonSerializer } from './serializer';

export function parseJson(value: object): ParseTree {
  return new JsonParser().parse(value);
}

export function serializeJson(value: ParseTree): object {
  return new JsonSerializer().serialize(value);
}

export { JsonParser, JsonSerializer };
