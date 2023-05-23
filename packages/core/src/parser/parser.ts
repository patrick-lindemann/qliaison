import { Root } from '../ast';

export abstract class Parser<InputType> {
  abstract parse(input: InputType): Root;
}
