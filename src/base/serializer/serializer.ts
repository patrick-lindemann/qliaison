import { Root } from 'base/ast';

export abstract class Serializer<OutputType> {
  abstract serialize(parseTree: Root): OutputType;
}
