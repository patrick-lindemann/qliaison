import { Root } from 'core/ast';

export abstract class Parser<InputType> {
  abstract parse(input: InputType): Root;
}
