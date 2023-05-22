import { grammar } from '@/grammar';
import { Root } from '@qliaison/core/ast';
import { Parser } from '@qliaison/core/parser';
import { Grammar, Parser as NearleyParser } from 'nearley';

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
