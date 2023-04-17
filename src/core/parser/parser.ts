import { RootNode } from '../ast';

export abstract class Parser<InputType>{

    abstract parse(input: InputType): RootNode;

}

export default Parser;