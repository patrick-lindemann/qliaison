import { ParseTree } from '@qliaison/core';
import { QueryParser } from './parser';
import { QuerySerializer, QuerySerializerOptions } from './serializer';

export function parseQuery(value: string): ParseTree {
  return new QueryParser().parse(value);
}

export function serializeQuery(
  tree: ParseTree,
  options?: QuerySerializerOptions
): string {
  return new QuerySerializer(options).serialize(tree);
}

export { QueryParser, QuerySerializer, QuerySerializerOptions };
