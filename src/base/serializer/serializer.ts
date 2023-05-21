import { ParseTree } from '@base/types';

export abstract class Serializer<OutputType> {
  abstract serialize(parseTree: ParseTree): OutputType;
}
