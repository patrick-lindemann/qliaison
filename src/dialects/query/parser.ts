import { Root } from '@base/ast';
import { Parser } from '@base/parser';
import { Grammar, Parser as NearleyParser } from 'nearley';
import { grammar } from './grammar';

export class QueryParser extends Parser<string> {
  protected _grammar: Grammar;

  constructor() {
    super();
    this._grammar = Grammar.fromCompiled(grammar);
  }

  parse(input: string): Root {
    const parser = new NearleyParser(this._grammar);
    // Append the EOL token to the end if it is missing
    if (!input.endsWith(';')) {
      input += ';';
    }
    parser.feed(input);
    return parser.finish()[0] as Root;
  }
}
