import { ParseTree } from '@qliaison/core';
import { WhereOptions } from '@sequelize/core';
import { SequelizeSerializer } from './serializer';

export function serializeSequelize<T extends WhereOptions>(
  tree: ParseTree
): WhereOptions<T> {
  return new SequelizeSerializer<T>().serialize(tree);
}

export { SequelizeSerializer };
