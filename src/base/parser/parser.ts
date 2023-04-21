import { Root } from 'base/ast';

export abstract class Parser<InputType> {
  abstract parse(input: InputType): Root;
}
