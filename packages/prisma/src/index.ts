import { ParseTree } from '@qliaison/core';
import { PrismaSerializer } from './serializer';

export function serializePrisma(value: ParseTree): unknown {
  return new PrismaSerializer().serialize(value);
}

export { PrismaSerializer };
