import { ParseTree } from '@/types';

export abstract class Serializer<OutputType> {
  abstract serialize(parseTree: ParseTree): OutputType;
}
